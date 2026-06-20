import React from 'react';
import { GraduationCap } from 'lucide-react';
import SectionTitle from './SectionTitle';

interface EducationData {
  school: string;
  degree: string;
  time: string;
  details: string[];
}

interface EducationProps {
  education: EducationData;
}

const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <section className="mb-4 print:break-inside-avoid">
      <SectionTitle icon={GraduationCap} title="教育背景" />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-700 ml-1">
        <span className="font-bold text-slate-800">{education.school}</span>
        <span className="text-slate-300">|</span>
        <span className="font-medium text-slate-600">{education.degree}</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-500 font-mono">{education.time}</span>
        {education.details && education.details.length > 0 && (
          <>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">{education.details.join('、')}</span>
          </>
        )}
      </div>
    </section>
  );
};

export default Education;
