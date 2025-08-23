export interface LinkItem { label: string; url: string }

export interface Role {
  title: string;
  period: string;
  highlights: string[];
  tags?: string[];
}

export interface ExperienceItem {
  company: string;
  location?: string;
  roles: Role[];
}

export interface EducationItem {
  school: string;
  program: string;
  period: string;
}

export type Skills = Record<string, string[] | string>;

export interface Resume {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  links?: LinkItem[];
  summary: string;
  skills: Skills;
  experience: ExperienceItem[];
  ai_projects?: string[];
  education: EducationItem[];
}
