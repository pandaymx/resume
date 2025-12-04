import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  icon?: LucideIcon;
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon: Icon, title, className = "" }) => {
  return (
    <h3 className={`text-lg font-bold text-slate-800 border-b-2 border-blue-500 pb-2 mb-4 flex items-center gap-2 ${className}`}>
      {Icon && <Icon size={20} className="text-blue-600" />} 
      {title}
    </h3>
  );
};

export default SectionTitle;
