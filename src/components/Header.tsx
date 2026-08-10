import type { FC } from 'react';
import { Fragment } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface ContactItem {
  icon: LucideIcon;
  value: string;
  link?: string;
  isLinkSafe?: boolean;
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  contact: ContactItem[];
}

export interface HeaderProps {
  profile: Profile;
}

const Header: FC<HeaderProps> = ({ profile }) => {
  return (
    <header className="bg-white pb-5 border-b border-slate-200/80 flex flex-col gap-3.5">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 flex-wrap">
      <div className="flex items-baseline gap-3 flex-wrap">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{profile.name}</h1>
        <span className="text-base md:text-lg text-slate-600 font-medium">{profile.title}</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs md:text-[13px] text-slate-500 print:text-slate-600">
        {profile.contact.map((item, index) => {
          const Icon = item.icon;
          return (
            <Fragment key={index}>
              <div className="flex items-center gap-1.5">
                <Icon size={14} className="text-slate-400" />
                {item.link && item.isLinkSafe ? (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-slate-900 hover:underline transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </div>
              {index < profile.contact.length - 1 && (
                <span className="text-slate-300 select-none">|</span>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
    
    {profile.summary && (
      <p className="text-slate-600 text-[14px] leading-relaxed border-l-2 border-slate-300 pl-3.5 mt-0.5">
        {profile.summary}
      </p>
    )}
  </header>
  );
};

export default Header;
