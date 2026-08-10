import type { FC } from 'react';
import { Code } from 'lucide-react';
import SectionTitle from './SectionTitle';

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface SkillsProps {
  skills: SkillGroup[];
}

const Skills: FC<SkillsProps> = ({ skills }) => {
  return (
    <section className="mb-6 print:break-inside-avoid">
      <SectionTitle icon={Code} title="专业技能" />
      <ul className="space-y-2 ml-1">
        {skills.map((skillGroup, index) => (
          <li key={index} className="text-[14px] text-slate-700 leading-relaxed flex items-start gap-1">
            <span className="font-bold text-slate-900 shrink-0">• {skillGroup.category}：</span>
            <span className="text-slate-600">{skillGroup.items.join('、')}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
