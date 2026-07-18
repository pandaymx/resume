import type { LucideIcon } from 'lucide-react';

export interface RawContactItem {
  icon: string;
  value: string;
  link?: string;
}

export interface RawProfile {
  name: string;
  title: string;
  summary: string;
  contact: RawContactItem[];
}

export interface ContactItem {
  icon: LucideIcon;
  value: string;
  link?: string;
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  contact: ContactItem[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationData {
  school: string;
  degree: string;
  time: string;
  details: string[];
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  time: string;
  details: string[];
}

export interface ProjectItem {
  name: string;
  tech: string;
  desc: string;
  achievements: string[];
  link?: string;
}

export interface ResumeData {
  profile: RawProfile;
  skills: SkillGroup[];
  education: EducationData;
  languages?: LanguageItem[];
  experience: ExperienceItem[];
  evaluation?: string[]; // Note from data/resume.ts: evaluation was unknown, but wasn't in json
  projects: ProjectItem[];
}
