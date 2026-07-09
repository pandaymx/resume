import { MapPin, Phone, Mail, GithubIcon, Globe } from "lucide-react";

import React from "react";

interface ResumeData {
  profile: {
    contact: Array<Record<string, unknown>>;
    [key: string]: unknown;
  };
  skills: unknown;
  education: unknown;
  languages?: unknown;
  experience: unknown;
  evaluation: unknown;
  projects: unknown;
}

// Declare the compile-time injected global variable from Vite config
declare const __RESUME_DATA__: ResumeData;

const resumeData = __RESUME_DATA__;

// Dynamic icon mapper to resolve JSON string descriptors to React components
const iconMap: Record<string, React.ElementType> = {
  Phone,
  Mail,
  MapPin,
  GithubIcon,
  Globe,
};

// Map contact icon strings to actual React components
export const profile = {
  ...resumeData.profile,
  contact: resumeData.profile.contact.map((item: Record<string, unknown>) => ({
    ...item,
    icon: iconMap[item.icon as string] || Globe,
  })),
};

export const skills = resumeData.skills;
export const education = resumeData.education;
export const languages = resumeData.languages || [];
export const experience = resumeData.experience;
export const projects = resumeData.projects;

declare const __AI_MEMORY__: string;

export const aiMemory = __AI_MEMORY__;
