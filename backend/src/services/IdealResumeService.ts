import Groq from 'groq-sdk';
import { IdealResumeRequest } from '../types/ats';
import { ResumeData } from '../types/resume';

const MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_JSON_ONLY =
  'Você responde APENAS com JSON válido. Sem texto antes, sem texto depois, sem blocos de código markdown (``` ou `), sem comentários. Apenas o objeto JSON puro.';

function extractJsonRaw(raw: string): string {
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) return match[1].trim();
  return raw.trim();
}

function buildPrompt(req: IdealResumeRequest): string {
  const { jobDescription, insights } = req;

  return `Você é um especialista em recrutamento técnico. Sua tarefa é criar um currículo fictício do "candidato ideal" para a vaga abaixo.

Este currículo NÃO é real — ele serve como referência de aprendizado para quem quer se tornar esse profissional. O candidato fictício deve ser totalmente plausível e realista, com histórico coerente.

## DESCRIÇÃO DA VAGA
${jobDescription}

## ANÁLISE ATS (contexto adicional)
Termos técnicos exigidos: ${insights.keywordsFound.concat(insights.keywordsMissing).join(', ')}
Melhorias identificadas: ${insights.improvements.join(' | ')}

## INSTRUÇÕES DE GERAÇÃO

### Perfil
- Nome: "Candidato Referência" (sempre este valor fixo)
- Título: cargo ideal para a vaga, objetivo e direto
- Email: "candidato@referencia.dev"
- Telefone: "(11) 99999-9999"
- Localização: cidade relevante para o mercado da vaga (ex: "São Paulo, SP" ou "Remoto")
- GitHub: "github.com/candidato-referencia"
- LinkedIn: "linkedin.com/in/candidato-referencia"

### Resumo profissional
- 4 a 6 linhas em português
- Deve destacar exatamente o perfil que a vaga busca
- Tom profissional, concreto, sem clichês
- Menciona anos de experiência compatíveis com a senioridade da vaga

### Experiências (2 a 3 empregos)
- Empresas fictícias mas com nomes plausíveis (ex: "TechCorp Soluções", "Finbank Digital", "LogiSmart")
- Cargos e períodos coerentes com a progressão de carreira
- Cada descrição: 3 a 5 bullets separados por \\n, com verbo no passado, destacando impacto mensurável quando possível
- techStack: tecnologias reais exigidas pela vaga, distribuídas entre os empregos de forma coerente
- O emprego mais recente deve usar as tecnologias principais da vaga

### Formação
- 1 a 2 entradas
- Curso relevante para a área (ex: "Ciência da Computação", "Engenharia de Software", "Sistemas de Informação")
- Instituição fictícia mas plausível
- Período coerente com a experiência gerada

### Cursos e certificações
- 2 a 4 cursos/certificações diretamente relacionados às tecnologias da vaga
- Plataformas reais: Alura, Udemy, AWS, Google Cloud, etc.

### Skills
- 12 a 18 skills
- As mais relevantes para a vaga em primeiro lugar
- Inclui linguagens, frameworks, ferramentas, metodologias da vaga

Retorne EXATAMENTE este JSON:
{
  "name": "Candidato Referência",
  "title": "...",
  "email": "candidato@referencia.dev",
  "phone": "(11) 99999-9999",
  "location": "...",
  "github": "github.com/candidato-referencia",
  "linkedin": "linkedin.com/in/candidato-referencia",
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

Apenas o JSON, nada mais.`;
}

export class IdealResumeService {
  private readonly client: Groq;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not set');
    }
    this.client = new Groq({ apiKey });
  }

  async generate(req: IdealResumeRequest): Promise<ResumeData> {
    const prompt = buildPrompt(req);

    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_JSON_ONLY },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 2048,
    });

    const raw = extractJsonRaw(completion.choices[0]?.message?.content ?? '');
    const parsed = JSON.parse(raw) as ResumeData;

    // Força campos de identidade para nunca vazar dados reais
    return {
      ...parsed,
      name: 'Candidato Referência',
      email: 'candidato@referencia.dev',
      phone: parsed.phone ?? '(11) 99999-9999',
      github: parsed.github ?? 'github.com/candidato-referencia',
      linkedin: parsed.linkedin ?? 'linkedin.com/in/candidato-referencia',
    };
  }
}
