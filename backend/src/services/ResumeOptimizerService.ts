import Groq from 'groq-sdk';
import { OptimizeResumeRequest } from '../types/ats';
import { ResumeData } from '../types/resume';

const MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_JSON_ONLY =
  'Você responde APENAS com JSON válido. Sem texto antes, sem texto depois, sem blocos de código markdown (``` ou `), sem comentários. Apenas o objeto JSON puro.';

function extractJsonRaw(raw: string): string {
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) return match[1].trim();
  return raw.trim();
}

function buildPrompt(req: OptimizeResumeRequest): string {
  const { resume, jobDescription, insights } = req;

  const experienceText = resume.experience
    .map(
      (e) =>
        `Empresa: ${e.company}\nCargo: ${e.role}\nPeríodo: ${e.period}\nDescrição:\n${e.description}${e.techStack ? `\nTecnologias: ${e.techStack}` : ''}`,
    )
    .join('\n\n');

  const educationText = resume.education
    .map((e) => `${e.degree} — ${e.institution} (${e.period})`)
    .join('\n');

  const coursesText =
    resume.courses
      ?.map((c) => `${c.name}${c.institution ? ` — ${c.institution}` : ''}`)
      .join('\n') ?? '';

  return `Você é um especialista em RH e otimização de currículos para processos seletivos.

## TAREFA
Adapte o currículo abaixo para a vaga descrita, tornando-o mais aderente sem inventar ou distorcer informações.
Você pode: reescrever o resumo profissional, reordenar skills, reformular descrições de experiências para dar ênfase ao que é relevante para a vaga, ajustar o título profissional se fizer sentido.
Você NÃO pode: adicionar tecnologias que o candidato não possui, criar cargos ou empresas fictícias, exagerar responsabilidades além do que foi descrito.

## DESCRIÇÃO DA VAGA
${jobDescription}

## CURRÍCULO ORIGINAL
Nome: ${resume.name}
Título: ${resume.title ?? '(não informado)'}
Resumo: ${resume.summary ?? '(não informado)'}
Skills: ${resume.skills.join(', ')}

Experiências:
${experienceText || '(não informado)'}

Formação:
${educationText || '(não informado)'}

Cursos:
${coursesText || '(não informado)'}

## ANÁLISE ATS JÁ FEITA
Pontos fortes: ${insights.strengths.join(' | ')}
Melhorias sugeridas: ${insights.improvements.join(' | ')}
Keywords encontradas: ${insights.keywordsFound.join(', ')}
Keywords ausentes no currículo: ${insights.keywordsMissing.join(', ')}

## INSTRUÇÕES DE SAÍDA
Retorne EXATAMENTE este JSON com o currículo adaptado. Mantenha name, email, phone, location, github, linkedin e education inalterados.
Adapte: title, summary, skills (reordene colocando as mais relevantes para a vaga primeiro), e para cada experiência reescreva description e techStack para enfatizar o que é relevante.

{
  "name": "...",
  "title": "...",
  "email": "...",
  "phone": "...",
  "location": "...",
  "github": "...",
  "linkedin": "...",
  "summary": "...",
  "skills": ["skill1", "skill2"],
  "experience": [
    {
      "company": "...",
      "role": "...",
      "period": "...",
      "description": "...",
      "techStack": "..."
    }
  ],
  "education": [
    {
      "institution": "...",
      "degree": "...",
      "period": "..."
    }
  ],
  "courses": [
    {
      "name": "...",
      "institution": "..."
    }
  ]
}

Regras:
- summary: 3 a 5 linhas, em português, focado no que a vaga pede e no que o candidato realmente tem
- skills: máximo 20 itens, os mais relevantes para a vaga aparecem primeiro
- description de cada experiência: bullets separados por \\n, começando com verbo no passado, destacando impacto e tecnologias usadas que a vaga valoriza
- techStack: lista as tecnologias reais usadas naquela experiência que sejam relevantes para a vaga
- NÃO altere company, role, period ou institution
- Responda apenas o JSON, sem mais nada`;
}

export class ResumeOptimizerService {
  private readonly client: Groq;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not set');
    }
    this.client = new Groq({ apiKey });
  }

  async optimize(req: OptimizeResumeRequest): Promise<ResumeData> {
    const prompt = buildPrompt(req);

    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_JSON_ONLY },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 2048,
    });

    const raw = extractJsonRaw(completion.choices[0]?.message?.content ?? '');

    const parsed = JSON.parse(raw) as ResumeData;

    // Garante que campos obrigatórios do currículo original não foram perdidos
    return {
      ...parsed,
      name: req.resume.name,
      email: req.resume.email,
      phone: req.resume.phone ?? parsed.phone,
      location: req.resume.location ?? parsed.location,
      github: req.resume.github ?? parsed.github,
      linkedin: req.resume.linkedin ?? parsed.linkedin,
      education: req.resume.education,
    };
  }
}
