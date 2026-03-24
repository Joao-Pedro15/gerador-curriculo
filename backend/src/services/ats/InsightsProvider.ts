import { ATSRequest, KeywordResult, ATSResult } from '../../types/ats';

/** Subconjunto do resultado que envolve raciocínio (strengths + improvements).
 *  Esta interface é o único ponto de extensão necessário para plugar IA no futuro:
 *
 *  - Hoje:   RuleBasedProvider  (lógica determinística, sem dependências externas)
 *  - Futuro: AIProvider         (chama Claude API com o mesmo contrato)
 *
 *  O ATSService e o controller não precisam mudar quando o provider for trocado.
 */
export interface InsightsResult {
  strengths: string[];
  improvements: string[];
}

export interface InsightsProvider {
  generateInsights(
    resume: ATSRequest['resume'],
    jobDescription: string,
    keywords: KeywordResult,
  ): Promise<InsightsResult>;
}

/** Tipo de retorno completo — re-exportado para conveniência dos consumers */
export type { ATSResult };
