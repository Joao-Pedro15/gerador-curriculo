import { ATSRequest, KeywordResult } from '../../types/ats';
import { InsightsProvider, InsightsResult } from './InsightsProvider';

/**
 * Implementação atual: lógica determinística baseada em regras.
 * Sem dependências externas, sem custo por requisição.
 *
 * Para adicionar IA no futuro, crie AIProvider.ts implementando InsightsProvider
 * e injete-o no ATSService — este arquivo não muda.
 */
export class RuleBasedProvider implements InsightsProvider {
  async generateInsights(
    resume: ATSRequest['resume'],
    _jobDescription: string,
    keywords: KeywordResult,
  ): Promise<InsightsResult> {
    const strengths: string[] = [];
    const improvements: string[] = [];

    // ── Strengths ──────────────────────────────────────────────────────────
    const topFound = keywords.found.filter((t) => t.length > 3).slice(0, 5);
    if (topFound.length > 0) {
      const count = keywords.found.length;
      const label = count === 1 ? 'termo relevante encontrado' : 'termos relevantes encontrados';
      strengths.push(
        `${count} ${label} no seu perfil: ${topFound.map((t) => `"${t}"`).join(', ')}${count > 5 ? ' e outros.' : '.'}`,
      );
    }

    if (resume.experience.some((e) => e.description.trim().length > 80)) {
      strengths.push(
        'Descrições de experiência detalhadas aumentam a relevância semântica para o ATS.',
      );
    }

    if (resume.skills.split('\n').filter(Boolean).length >= 4) {
      strengths.push('Seção de qualificações bem preenchida com múltiplas habilidades.');
    }

    if ((resume.summary ?? '').trim().length > 60) {
      strengths.push(
        'Resumo profissional presente — primeiro campo que muitos ATS utilizam para scoring.',
      );
    }

    if ((resume.title ?? '').trim().length > 0) {
      strengths.push('Título profissional definido, alinhando a candidatura ao cargo desde o início.');
    }

    if (strengths.length === 0) {
      strengths.push('Preencha mais campos do formulário para uma análise mais precisa.');
    }

    // ── Improvements ───────────────────────────────────────────────────────
    const topMissing = keywords.missing.filter((t) => t.length > 3).slice(0, 6);
    if (topMissing.length > 0) {
      improvements.push(
        `Inclua no currículo termos presentes na vaga que estão ausentes: ${topMissing.map((t) => `"${t}"`).join(', ')}.`,
      );
    }

    if (!(resume.title ?? '').trim()) {
      improvements.push(
        'Preencha o "Título profissional" — é o primeiro elemento avaliado pelo ATS.',
      );
    }

    if (resume.experience.some((e) => !(e.techStack ?? '').trim())) {
      improvements.push(
        'Adicione "Tech Stack" em todas as experiências para aumentar o match técnico.',
      );
    }

    if ((resume.summary ?? '').trim().length < 60) {
      improvements.push(
        'Escreva um resumo profissional usando a linguagem da própria descrição da vaga.',
      );
    }

    if (improvements.length === 0) {
      improvements.push(
        'Seu currículo está bem alinhado. Revise a formatação e garanta que os dados estejam atualizados.',
      );
    }

    return { strengths, improvements };
  }
}
