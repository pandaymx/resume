import { MapPin, Phone, Mail, GithubIcon, Globe } from "lucide-react";

import type { ElementType } from 'react';
import type {
  ResumeData,
  Profile,
  SkillGroup,
  EducationData,
  LanguageItem,
  ExperienceItem,
  ProjectItem,
  RawContactItem
} from "../types/resume";

// Declare the compile-time injected global variable from Vite config
declare const __RESUME_DATA__: ResumeData;

const resumeData = __RESUME_DATA__;

// Dynamic icon mapper to resolve JSON string descriptors to React components
const iconMap: Record<string, ElementType> = {
  Phone,
  Mail,
  MapPin,
  GithubIcon,
  Globe,
};

// Map contact icon strings to actual React components
export const profile: Profile = {
  ...resumeData.profile,
  contact: resumeData.profile.contact.map((item: RawContactItem) => ({
    ...item,
    icon: (iconMap[item.icon] || Globe) as unknown as import('lucide-react').LucideIcon,
  })),
};

export const skills: SkillGroup[] = resumeData.skills;
export const education: EducationData = resumeData.education;
export const languages: LanguageItem[] = resumeData.languages || [];
export const experience: ExperienceItem[] = resumeData.experience;
export const projects: ProjectItem[] = resumeData.projects;

declare const __AI_MEMORY__: string;

export const aiMemory = __AI_MEMORY__;
