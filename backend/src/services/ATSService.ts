import { ATSRequest, ATSResult, KeywordResult } from '../types/ats';
import { InsightsProvider } from './ats/InsightsProvider';
import { RuleBasedProvider } from './ats/RuleBasedProvider';

// ── Stopwords PT-BR + EN ─────────────────────────────────────────────────────
const STOPWORDS = new Set([
  'de','a','o','que','e','do','da','em','um','para','é','com','uma','os','no',
  'se','na','por','mais','as','dos','como','mas','foi','ao','ele','das','tem',
  'à','seu','sua','ou','ser','quando','muito','há','nos','já','está','eu',
  'também','só','pelo','pela','até','isso','ela','entre','era','depois','sem',
  'mesmo','aos','ter','seus','suas','esse','eles','você','essa','nem',
  'the','and','or','in','of','to','is','for','on','with','that','are','at',
  'be','this','from','by','we','you','have','it','not','an','will','your',
  'our','their','all','but','they','can','has','was','were','been','being',
  'este','esta','esses','essas','aquele','aquela','nós','me','te','lhe',
  'meu','minha','teu','tua','nosso','nossa','sim','não','onde','porque',
  'quem','qual','quais','quanto','cada','todo','toda','todos','todas',
  'outro','outra','outros','outras','novo','nova','grande','pequeno',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s+#.]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w) && !/^\d+$/.test(w));
}

function buildProfileText(resume: ATSRequest['resume']): string {
  return [
    resume.title ?? '',
    resume.summary ?? '',
    resume.skills,
    ...resume.experience.map((e) => `${e.role} ${e.company} ${e.description} ${e.techStack ?? ''}`),
    ...resume.education.map((e) => `${e.degree} ${e.institution}`),
    ...resume.courses.map((c) => `${c.name} ${c.institution ?? ''}`),
  ]
    .join(' ')
    .toLowerCase();
}

function extractKeywords(resume: ATSRequest['resume'], jobDescription: string): KeywordResult {
  const jobTokens = [...new Set(tokenize(jobDescription))];
  const profileText = buildProfileText(resume);

  const found: string[] = [];
  const missing: string[] = [];

  for (const token of jobTokens) {
    const match =
      profileText.includes(token) ||
      (token.length > 5 && profileText.includes(token.slice(0, -1)));

    if (match) found.push(token);
    else missing.push(token);
  }

  return { found, missing };
}

function calculateScore(keywords: KeywordResult): number {
  const total = keywords.found.length + keywords.missing.length;
  if (total === 0) return 0;
  return Math.round((keywords.found.length / total) * 100);
}

function resolveLevel(score: number): ATSResult['level'] {
  if (score >= 65) return 'alto';
  if (score >= 38) return 'médio';
  return 'baixo';
}

// ── Service ──────────────────────────────────────────────────────────────────

export class ATSService {
  constructor(private readonly insightsProvider: InsightsProvider) {}

  async analyze(request: ATSRequest): Promise<ATSResult> {
    const keywords = extractKeywords(request.resume, request.jobDescription);
    const score = calculateScore(keywords);
    const level = resolveLevel(score);

    const insights = await this.insightsProvider.generateInsights(
      request.resume,
      request.jobDescription,
      keywords,
    );

    return {
      score,
      level,
      keywordsFound: keywords.found.filter((t) => t.length > 3).slice(0, 14),
      keywordsMissing: keywords.missing.filter((t) => t.length > 3).slice(0, 10),
      strengths: insights.strengths,
      improvements: insights.improvements,
    };
  }
}

/**
 * Instância singleton exportada para uso nos controllers.
 *
 * Para plugar IA no futuro, basta trocar o provider aqui:
 *   import { AIProvider } from './ats/AIProvider';
 *   export const atsService = new ATSService(new AIProvider());
 */
export const atsService = new ATSService(new RuleBasedProvider());
