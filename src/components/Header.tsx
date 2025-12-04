import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ContactItem {
  icon: LucideIcon;
  value: string;
  link?: string;
}

interface Profile {
  name: string;
  title: string;
  summary: string;
  contact: ContactItem[];
}

interface HeaderProps {
  profile: Profile;
}

const Header: React.FC<HeaderProps> = ({ profile }) => (
  <header className="bg-slate-800 text-white p-8 print:bg-slate-800 print:text-white md:flex md:justify-between md:items-center">
    <div>
      <h1 className="text-4xl font-bold mb-2 tracking-wide">{profile.name}</h1>
      <h2 className="text-xl text-blue-300 font-medium mb-4">{profile.title}</h2>
      <p className="text-slate-300 max-w-lg text-sm leading-relaxed">{profile.summary}</p>
    </div>
    <div className="mt-6 md:mt-0 flex flex-col gap-2 text-sm text-slate-300">
      {profile.contact.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex items-center gap-3">
            <Icon size={16} className="text-blue-400" />
            {item.link ? (
              <a href={item.link} className="hover:text-white transition-colors">{item.value}</a>
            ) : (
              <span>{item.value}</span>
            )}
          </div>
        );
      })}
    </div>
  </header>
);

export default Header;
