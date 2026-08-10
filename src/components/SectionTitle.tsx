import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface SectionTitleProps {
  icon?: LucideIcon;
  title: string;
  className?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ icon: Icon, title, className = "" }) => {
  return (
    <h3 className={`text-base md:text-lg font-bold text-slate-900 border-b-2 border-slate-800/15 pb-2 mb-4 flex items-center gap-2.5 tracking-tight ${className}`}>
      {Icon && <Icon size={18} className="text-slate-500" />} 
      {title}
    </h3>
  );
};

export default SectionTitle;
