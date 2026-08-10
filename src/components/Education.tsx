import type { FC } from 'react';
import { GraduationCap } from 'lucide-react';
import SectionTitle from './SectionTitle';

export interface EducationData {
  school: string;
  degree: string;
  time: string;
  details: string[];
}

export interface EducationProps {
  education: EducationData;
}

const Education: FC<EducationProps> = ({ education }) => {
  return (
    <section className="mb-6 print:break-inside-avoid">
      <SectionTitle icon={GraduationCap} title="教育背景" />
      <div className="flex justify-between items-baseline flex-wrap gap-2 text-[14px] text-slate-700 ml-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-bold text-slate-900 text-[15px]">{education.school}</span>
          {education.degree && (
            <>
              <span className="text-slate-300">|</span>
              <span className="font-medium text-slate-700">{education.degree}</span>
            </>
          )}
          {education.details && education.details.length > 0 && (
            <>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">{education.details.join('、')}</span>
            </>
          )}
        </div>
        <span className="text-xs md:text-sm text-slate-500 font-mono text-right shrink-0">{education.time}</span>
      </div>
    </section>
  );
};

export default Education;
