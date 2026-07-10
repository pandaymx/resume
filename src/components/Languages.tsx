import React from 'react';
import { Languages as LanguagesIcon } from 'lucide-react';
import SectionTitle from './SectionTitle';

export interface LanguageItem {
  name: string;
  level: string;
}

export interface LanguagesProps {
  languages: LanguageItem[];
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
  if (!languages || languages.length === 0) return null;

  return (
    <section className="mb-6 print:break-inside-avoid">
      <SectionTitle icon={LanguagesIcon} title="语言能力" />
      <ul className="space-y-1.5 ml-1">
        {languages.map((lang, index) => (
          <li key={index} className="text-xs text-slate-700 leading-relaxed flex items-start gap-1">
            <span className="font-bold text-slate-800 shrink-0">• {lang.name}：</span>
            <span className="text-slate-600">{lang.level}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Languages;
