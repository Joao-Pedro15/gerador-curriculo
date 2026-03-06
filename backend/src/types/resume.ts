export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
}

export interface ResumeData {
  name: string;
  title?: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
}
