import Groq from 'groq-sdk';
import { ATSRequest, KeywordResult } from '../../types/ats';
import { InsightsProvider, InsightsResult } from './InsightsProvider';

const MODEL = 'llama-3.1-8b-instant';

const SYSTEM_JSON_ONLY =
  'Você responde APENAS com JSON válido. Sem texto antes, sem texto depois, sem blocos de código markdown (``` ou `), sem comentários. Apenas o objeto JSON puro.';

/** Remove possíveis envoltórios de markdown (```json ... ```) que o modelo pode gerar */
function extractJsonRaw(raw: string): string {
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) return match[1].trim();
  return raw.trim();
}

function buildKeywordsPrompt(jobDescription: string): string {
  return `Extraia SOMENTE os termos técnicos relevantes da descrição de vaga abaixo.

INCLUA: linguagens (Python, JavaScript, TypeScript), frameworks (React, NestJS, Django, Spring), bancos de dados (PostgreSQL, MongoDB, Redis), ferramentas (Docker, Git, Kubernetes, Jenkins), conceitos técnicos (REST API, GraphQL, CI/CD, microsserviços, SOLID, TDD), plataformas (AWS, GCP, Azure), metodologias (Scrum, Agile, Kanban) e nomes específicos de tecnologias.

EXCLUA: qualquer palavra que não seja um termo técnico específico (ex: "experiência", "anos", "empresa", "candidato", "vaga", "equipe").

Formato de saída — exatamente este JSON, nada mais:
{"keywords": ["Termo1", "Termo2"]}

Regras adicionais:
- Máximo 30 termos
- Grafia canônica: "NestJS", "PostgreSQL", "TypeScript", "Node.js", "Vue.js"
- Sem termos técnicos encontrados → {"keywords": []}

DESCRIÇÃO DA VAGA:
${jobDescription}

JSON:`;
}

function buildPrompt(
  resume: ATSRequest['resume'],
  jobDescription: string,
  keywords: KeywordResult,
): string {
  const experienceText = resume.experience
    .map((e) => `- ${e.role} @ ${e.company}: ${e.description}${e.techStack ? ` [${e.techStack}]` : ''}`)
    .join('\n');

  const educationText = resume.education
    .map((e) => `- ${e.degree} @ ${e.institution}`)
    .join('\n');

  const foundSample = keywords.found.filter((t) => t.length > 3).slice(0, 10).join(', ');
  const missingSample = keywords.missing.filter((t) => t.length > 3).slice(0, 10).join(', ');

  return `Você é um especialista em recrutamento técnico e ATS (Applicant Tracking System).
Analise o currículo abaixo em relação à descrição da vaga e forneça insights profissionais em português.

## DESCRIÇÃO DA VAGA
${jobDescription}

## CURRÍCULO
Título: ${resume.title ?? '(não informado)'}
Resumo: ${resume.summary ?? '(não informado)'}
Habilidades: ${resume.skills}
Experiências:
${experienceText || '(não informado)'}
Formação:
${educationText || '(não informado)'}

## ANÁLISE DE KEYWORDS (já calculada)
Termos encontrados no currículo: ${foundSample || 'nenhum'}
Termos ausentes no currículo: ${missingSample || 'nenhum'}

## TAREFA
Responda EXCLUSIVAMENTE com JSON válido neste formato, sem markdown, sem texto extra:
{
  "strengths": ["ponto forte 1", "ponto forte 2", "ponto forte 3"],
  "improvements": ["melhoria 1", "melhoria 2", "melhoria 3"]
}

Regras:
- Máximo 4 itens em cada lista
- Cada item: frase objetiva de até 2 linhas
- Seja específico ao currículo e à vaga, evite frases genéricas
- Idioma: português brasileiro`;
}

export class GroqProvider implements InsightsProvider {
  private readonly client: Groq;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not set');
    }
    this.client = new Groq({ apiKey });
  }

  async extractJobKeywords(jobDescription: string): Promise<string[] | null> {
    const prompt = buildKeywordsPrompt(jobDescription);

    try {
      const completion = await this.client.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_JSON_ONLY },
          { role: 'user', content: prompt },
        ],
        temperature: 0.1,
        max_tokens: 256,
      });

      const raw = extractJsonRaw(completion.choices[0]?.message?.content ?? '');
      const parsed = JSON.parse(raw) as { keywords?: unknown };
      if (Array.isArray(parsed.keywords)) {
        return (parsed.keywords as unknown[]).filter((k): k is string => typeof k === 'string');
      }
    } catch (err) {
      console.error('GroqProvider.extractJobKeywords: failed', err);
    }
    return null;
  }

  async generateInsights(
    resume: ATSRequest['resume'],
    jobDescription: string,
    keywords: KeywordResult,
  ): Promise<InsightsResult> {
    const prompt = buildPrompt(resume, jobDescription, keywords);

    console.log({ prompt })

    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_JSON_ONLY },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 512,
    });

    const raw = extractJsonRaw(completion.choices[0]?.message?.content ?? '');

    console.log({ raw, completion })

    try {
      const parsed = JSON.parse(raw) as Partial<InsightsResult>;
      console.log({ parsed })
      return {
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
        improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
      };
    } catch {
      console.error('GroqProvider: failed to parse JSON response:', raw);
      return {
        strengths: ['Não foi possível gerar a análise detalhada. Tente novamente.'],
        improvements: ['Não foi possível gerar sugestões de melhoria. Tente novamente.'],
      };
    }
  }
}
