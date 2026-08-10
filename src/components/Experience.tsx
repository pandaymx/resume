import type { FC } from 'react';
import { Briefcase } from 'lucide-react';
import SectionTitle from './SectionTitle';

export interface ExperienceItem {
  role: string;
  company: string;
  time: string;
  details: string[];
}

export interface ExperienceProps {
  experience: ExperienceItem[];
}

const Experience: FC<ExperienceProps> = ({ experience }) => {
  return (
    <section className="mb-6">
      <SectionTitle icon={Briefcase} title="工作经历" />
      <div className="space-y-5">
        {experience.map((job, index) => (
          <div key={index} className="relative pl-4 border-l-2 border-slate-200 ml-1 print:break-inside-avoid">
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-[7px] w-2 h-2 rounded-full bg-slate-400 border border-white"></div>
            
            <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-bold text-slate-900 text-[15px]">{job.company}</span>
                {job.role && (
                  <>
                    <span className="text-slate-300 font-light select-none">|</span>
                    <span className="font-semibold text-slate-700 text-[14.5px]">{job.role}</span>
                  </>
                )}
              </div>
              <span className="text-xs md:text-sm text-slate-500 font-mono text-right shrink-0">{job.time}</span>
            </div>
            
            <ul className="list-disc list-outside ml-4 text-[14px] text-slate-600 space-y-2 leading-relaxed">
              {job.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
