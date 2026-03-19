export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string;
  techStack?: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
}

export interface CourseEntry {
  name: string;
  institution?: string;
}

export interface ResumeData {
  name: string;
  title?: string;
  email: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  summary?: string;
  skills: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  courses?: CourseEntry[];
}
