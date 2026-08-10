import { useMemo, type FC } from 'react';
import { Server, ExternalLink } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { isSafeUrl } from '../utils/sanitizeUrl';

export interface ProjectItem {
  name: string;
  tech: string;
  desc: string;
  achievements: string[];
  link?: string;
}

export interface ProjectsProps {
  projects: ProjectItem[];
}

const Projects: FC<ProjectsProps> = ({ projects }) => {
  const memoizedProjects = useMemo(() => {
    return projects.map(project => ({
      ...project,
      isLinkSafe: project.link ? isSafeUrl(project.link) : false
    }));
  }, [projects]);
  return (
    <section className="mb-6">
      <SectionTitle icon={Server} title="重点项目" />
      <div className="space-y-5">
        {memoizedProjects.map((project, index) => (
          <div 
            key={index} 
            className="pb-4 border-b border-slate-200/70 last:border-0 last:pb-0 print:break-inside-avoid"
          >
            <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h4 className="font-bold text-slate-900 text-[15px]">{project.name}</h4>
                <span className="text-xs text-slate-500 font-medium">（技术栈: {project.tech}）</span>
              </div>
              {project.link && project.isLinkSafe ? (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-xs md:text-sm font-medium flex items-center gap-1 cursor-pointer print:hidden no-underline shrink-0"
                >
                  查看代码 <ExternalLink size={13}/>
                </a>
              ) : null}
            </div>
            
            <div className="text-[14px] text-slate-600 space-y-2 mt-2 leading-relaxed">
              <p><span className="font-semibold text-slate-800">项目描述：</span>{project.desc}</p>
              <div>
                <span className="font-semibold text-slate-800">核心贡献：</span>
                <ul className="list-disc list-outside ml-4 text-slate-600 space-y-2 mt-1.5">
                  {project.achievements.map((achieve, idx) => (
                    <li key={idx}>{achieve}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
