import React from 'react';
import { Briefcase, Server, ExternalLink } from 'lucide-react';
import SectionTitle from './SectionTitle';

interface Experience {
  role: string;
  company: string;
  time: string;
  color: string;
  details: string[];
}

interface Project {
  name: string;
  tech: string;
  desc: string;
  achievements: string[];
}

interface MainContentProps {
  experience: Experience[];
  projects: Project[];
}

const MainContent: React.FC<MainContentProps> = ({ experience, projects }) => {
  return (
    <main className="w-full md:w-2/3 p-8 print:w-2/3">
      
      {/* 工作经历 */}
      <section className="mb-10">
        <SectionTitle icon={Briefcase} title="工作经历" />
        
        {experience.map((job, index) => (
          <div key={index} className={`mb-8 relative pl-4 border-l-2 ${job.color === 'blue' ? 'border-blue-200' : 'border-gray-200'} print:break-inside-avoid`}>
            {/* 时间轴圆点 */}
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white ${job.color === 'blue' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
            
            <div className="flex justify-between items-baseline mb-2 flex-wrap">
              <h4 className="text-lg font-bold text-slate-800">{job.role}</h4>
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{job.time}</span>
            </div>
            <div className="text-blue-600 font-medium mb-3">{job.company}</div>
            
            <ul className="list-disc list-outside ml-4 text-sm text-slate-600 space-y-2 leading-relaxed">
              {job.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 项目经验 */}
      <section>
        <SectionTitle icon={Server} title="重点项目" />
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-slate-50 p-4 rounded border border-slate-100 print:bg-white print:border print:border-slate-300 print:break-inside-avoid">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-800">{project.name}</h4>
                <div className="text-blue-500 text-xs flex items-center gap-1 cursor-pointer print:hidden">
                  查看代码 <ExternalLink size={12}/>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-3">技术栈: {project.tech}</p>
              <div className="text-sm text-slate-600 space-y-1">
                <p><span className="font-semibold">项目描述：</span>{project.desc}</p>
                <p><span className="font-semibold">核心贡献：</span></p>
                <ul className="list-disc list-inside pl-2 text-slate-600">
                  {project.achievements.map((achieve, idx) => (
                    <li key={idx}>{achieve}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
