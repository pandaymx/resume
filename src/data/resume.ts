import { 
  MapPin, Phone, Mail, GithubIcon, Globe
} from 'lucide-react';
import resumeData from '../../resume.json';

// Dynamic icon mapper to resolve JSON string descriptors to React components
const iconMap: Record<string, any> = {
  Phone,
  Mail,
  MapPin,
  GithubIcon,
  Globe
};

// Map contact icon strings to actual React components
export const profile = {
  ...resumeData.profile,
  contact: resumeData.profile.contact.map((item) => ({
    ...item,
    icon: iconMap[item.icon] || Globe
  }))
};

export const skills = resumeData.skills;
export const education = resumeData.education;
export const languages = resumeData.languages;
export const experience = resumeData.experience;
export const evaluation = resumeData.evaluation;
export const projects = resumeData.projects;
