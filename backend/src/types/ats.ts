import { ExperienceEntry, EducationEntry, CourseEntry } from './resume';

/** Payload recebido pelo endpoint POST /api/analyze-ats */
export interface ATSRequest {
  resume: {
    title?: string;
    summary?: string;
    skills: string;               // texto livre, uma habilidade por linha
    experience: ExperienceEntry[];
    education: EducationEntry[];
    courses: CourseEntry[];
  };
  jobDescription: string;
}

/** Resultado intermediário da extração de keywords */
export interface KeywordResult {
  found: string[];
  missing: string[];
}

/** Resposta final do endpoint — espelhada no frontend como ATSResult */
export interface ATSResult {
  score: number;
  level: 'baixo' | 'médio' | 'alto';
  keywordsFound: string[];
  keywordsMissing: string[];
  strengths: string[];
  improvements: string[];
}
