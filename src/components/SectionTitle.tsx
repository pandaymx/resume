import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface SectionTitleProps {
  icon?: LucideIcon;
  title: string;
  className?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ icon: Icon, title, className = "" }) => {
  return (
    <h3 className={`text-base font-bold text-slate-800 border-b border-slate-200 pb-1.5 mb-4 flex items-center gap-2 ${className}`}>
      {Icon && <Icon size={18} className="text-slate-500" />} 
      {title}
    </h3>
  );
};

export default SectionTitle;
