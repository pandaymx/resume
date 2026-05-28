import React from 'react';
import { Code, GraduationCap, Globe, UserCheck } from 'lucide-react';
import SectionTitle from './SectionTitle';

interface SkillGroup {
  category: string;
  items: string[];
}

interface Education {
  school: string;
  degree: string;
  time: string;
  details: string[];
}

interface Language {
  name: string;
  level: string;
}

interface SidebarProps {
  skills: SkillGroup[];
  education: Education;
  languages: Language[];
  evaluation?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ skills, education, languages, evaluation }) => {
  return (
    <aside className="bg-slate-50 w-full md:w-1/3 p-6 border-r border-slate-200 print:w-1/3 print:bg-slate-50">
      
      {/* 技能模块 */}
      <section className="mb-8">
        <SectionTitle icon={Code} title="技术栈" />
        <div className="space-y-4">
          {skills.map((skillGroup, index) => (
            <div key={index}>
              <h4 className="font-semibold text-slate-700 text-sm mb-2">{skillGroup.category}</h4>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 教育模块 */}
      <section className="mb-8">
        <SectionTitle icon={GraduationCap} title="教育背景" />
        <div className="mb-3">
          <div className="font-bold text-slate-700">{education.school}</div>
          <div className="text-sm text-slate-600">{education.degree}</div>
          <div className="text-xs text-slate-500 mt-1">{education.time}</div>
        </div>
        <div className="text-xs text-slate-600">
          <ul className="list-disc list-inside">
            {education.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 语言模块 */}
      <section>
        <SectionTitle icon={Globe} title="语言" />
        <ul className="text-sm text-slate-700 space-y-2">
          {languages.map((lang, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{lang.name}</span>
              <span className="font-semibold">{lang.level}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 个人评价 */}
      {evaluation && (
        <section className="mt-8">
          <SectionTitle icon={UserCheck} title="个人评价" />
          <p className="text-sm text-slate-700 leading-relaxed">
            {evaluation}
          </p>
        </section>
      )}
    </aside>
  );
};

export default Sidebar;
