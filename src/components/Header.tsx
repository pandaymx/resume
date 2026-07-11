import { useMemo, type FC } from 'react';
import { Fragment } from 'react';
import type { LucideIcon } from 'lucide-react';
import { isSafeUrl } from '../utils/sanitizeUrl';

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

export interface HeaderProps {
  profile: Profile;
}

const Header: FC<HeaderProps> = ({ profile }) => {
  const memoizedContact = useMemo(() => {
    return profile.contact.map(item => ({
      ...item,
      isLinkSafe: item.link ? isSafeUrl(item.link) : false
    }));
  }, [profile.contact]);

  return (
    <header className="bg-white pt-6 pb-4 border-b border-slate-200 flex flex-col gap-3">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 flex-wrap">
      <div className="flex items-baseline gap-3 flex-wrap">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{profile.name}</h1>
        <span className="text-lg text-slate-500 font-medium">{profile.title}</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 print:text-slate-600">
        {memoizedContact.map((item, index) => {
          const Icon = item.icon;
          return (
            <Fragment key={index}>
              <div className="flex items-center gap-1">
                <Icon size={13} className="text-slate-400" />
                {item.link && item.isLinkSafe ? (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-slate-800 hover:underline transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </div>
              {index < memoizedContact.length - 1 && (
                <span className="text-slate-300 select-none">|</span>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
    
    <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-slate-200 pl-3.5 mt-1">
      {profile.summary}
    </p>
  </header>
  );
};

export default Header;
