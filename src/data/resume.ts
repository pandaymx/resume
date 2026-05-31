import { MapPin, Phone, Mail, GithubIcon, Globe } from "lucide-react";

// Declare the compile-time injected global variable from Vite config
declare const __RESUME_DATA__: any;

const resumeData = __RESUME_DATA__;

// Dynamic icon mapper to resolve JSON string descriptors to React components
const iconMap: Record<string, any> = {
  Phone,
  Mail,
  MapPin,
  GithubIcon,
  Globe,
};

// Map contact icon strings to actual React components
export const profile = {
  ...resumeData.profile,
  contact: resumeData.profile.contact.map((item: any) => ({
    ...item,
    icon: iconMap[item.icon] || Globe,
  })),
};

export const skills = resumeData.skills;
export const education = resumeData.education;
export const languages = resumeData.languages || [];
export const experience = resumeData.experience;
export const evaluation = resumeData.evaluation;
export const projects = resumeData.projects;

declare const __AI_MEMORY__: string;

export const aiMemory = __AI_MEMORY__;
