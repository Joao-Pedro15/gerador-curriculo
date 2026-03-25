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

// Palavras de prosa comuns em descrições de vagas que não são tech-relevantes
const PROSE_WORDS = new Set([
  // inglês
  'will','must','should','would','could','may','might','need','needs',
  'required','require','requirements','preferred','plus','minimum','years',
  'year','experience','work','working','strong','good','excellent','ability',
  'knowledge','understanding','familiarity','develop','development','implement',
  'implementation','maintain','maintenance','support','team','looking','join',
  'candidate','candidates','please','send','apply','opportunity','role',
  'position','company','benefits','offer','including','following','skills',
  'environment','solution','solutions','system','systems','application',
  'applications','using','used','use','build','building','built','create',
  'creating','manage','managing','design','designing','ensure','ensuring',
  'provide','providing','responsible','responsibilities','activities',
  // português
  'vaga','empresa','cargo','função','requisito','requisitos','desejável',
  'diferencial','busca','buscamos','procura','procuramos','oportunidade',
  'candidato','candidatos','profissional','profissionais','área','equipe',
  'trabalhar','atuar','atuação','responsável','atividades','nível','nivel',
  'pleno','senior','sênior','junior','júnior','analista','desenvolvedor',
  'desenvolvimento','sistema','sistemas','solução','soluções','aplicação',
  'aplicações','utilizando','utilizar','construir','criar','manter','garantir',
  'fornecer','gerenciar','projetar','incluindo','seguintes','habilidades',
  'ambiente','solucionar','implementar','realizar','executar','conhecimento',
  'experiência','anos','ano','forte','ótimo','excelente','capacidade',
  'entendimento','familiaridade','necessário','obrigatório','preferível',
]);

// Normaliza tech terms: remove separadores → "nest.js" == "nestjs" == "nest-js"
function normalizeTech(s: string): string {
  return s.toLowerCase().replace(/[.\-_ ]/g, '');
}

// Tokeniza a descrição da vaga preservando chars técnicos (+, #, .)
function tokenizeJobDescription(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s+#.]/g, ' ')
    .split(/\s+/)
    .filter(
      (w) =>
        w.length > 2 &&
        !STOPWORDS.has(w) &&
        !PROSE_WORDS.has(w) &&
        !/^\d+$/.test(w),
    );
}

// Constrói um Set com tokens originais + normalizados do perfil (busca O(1))
function buildProfileTokenSet(profileText: string): Set<string> {
  const raw = profileText
    .replace(/[^\w\s.#+\-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
  const set = new Set<string>();
  for (const w of raw) {
    set.add(w.toLowerCase());
    set.add(normalizeTech(w));
  }
  return set;
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
  const jobTokens = [...new Set(tokenizeJobDescription(jobDescription))];
  const profileText = buildProfileText(resume);
  const profileSet = buildProfileTokenSet(profileText);

  const found: string[] = [];
  const missing: string[] = [];

  for (const token of jobTokens) {
    const normalized = normalizeTech(token);
    const match =
      profileSet.has(token) ||
      profileSet.has(normalized) ||
      (token.length > 5 &&
        (profileSet.has(token.slice(0, -1)) ||
          profileSet.has(normalizeTech(token.slice(0, -1)))));

    if (match) found.push(token);
    else missing.push(token);
  }

  return { found, missing };
}

// Matching quando a IA já extraiu os termos técnicos da vaga
function matchKeywordsFromAI(aiKeywords: string[], resume: ATSRequest['resume']): KeywordResult {
  const profileText = buildProfileText(resume);
  const profileSet = buildProfileTokenSet(profileText);

  const found: string[] = [];
  const missing: string[] = [];

  for (const term of aiKeywords) {
    const token = term.toLowerCase();
    const normalized = normalizeTech(token);
    const match =
      profileSet.has(token) ||
      profileSet.has(normalized) ||
      (token.length > 5 &&
        (profileSet.has(token.slice(0, -1)) ||
          profileSet.has(normalizeTech(token.slice(0, -1)))));

    if (match) found.push(term);
    else missing.push(term);
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
    // Tenta extrair keywords via IA; cai no tokenizador heurístico se não disponível
    const aiKeywords = await this.insightsProvider.extractJobKeywords?.(request.jobDescription) ?? null;
    const keywords = aiKeywords
      ? matchKeywordsFromAI(aiKeywords, request.resume)
      : extractKeywords(request.resume, request.jobDescription);

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
      keywordsFound: keywords.found.filter((t: string) => t.length > 3).slice(0, 14),
      keywordsMissing: keywords.missing.filter((t: string) => t.length > 3).slice(0, 10),
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
