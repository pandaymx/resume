import React from 'react';
import { Briefcase } from 'lucide-react';
import SectionTitle from './SectionTitle';

export interface ExperienceItem {
  role: string;
  company: string;
  time: string;
  color: string;
  details: string[];
}

export interface ExperienceProps {
  experience: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section className="mb-6">
      <SectionTitle icon={Briefcase} title="工作经历" />
      <div className="space-y-4">
        {experience.map((job, index) => (
          <div key={index} className="relative pl-4 border-l border-slate-200/80 ml-1 print:break-inside-avoid">
            {/* Elegant gray timeline bullet */}
            <div className="absolute -left-[4px] top-[6px] w-2 h-2 rounded-full bg-slate-300 border border-white"></div>
            
            <div className="flex justify-between items-baseline mb-1.5 flex-wrap gap-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-bold text-slate-800 text-sm">{job.company}</span>
                <span className="text-slate-300 font-light select-none">|</span>
                <span className="font-semibold text-slate-700 text-sm">{job.role}</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">{job.time}</span>
            </div>
            
            <ul className="list-disc list-outside ml-4 text-xs text-slate-600 space-y-1.5 leading-relaxed">
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
