import React, { useState } from 'react';
import { Download, Brain, X, Printer } from 'lucide-react';

// Import data
import * as data from './data/resume';

// Import split components
import Header from './components/Header';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Languages from './components/Languages';

// Import types for proper typing
import type { Profile } from './components/Header';
import type { ExperienceItem } from './components/Experience';
import type { ProjectItem } from './components/Projects';
import type { SkillGroup } from './components/Skills';
import type { EducationData } from './components/Education';
import type { LanguageItem } from './components/Languages';

import { renderMarkdown } from './utils/markdown';

const App: React.FC = () => {
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const handlePrint = () => window.print();

  // Print only the AI Memory contents (print styling is dynamically injected when modal is open)
  const handlePrintMemory = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen bg-gray-100 p-4 md:p-8 font-sans print:p-0 print:bg-white relative ${isMemoryOpen ? 'print-memory-mode' : ''}`}>
      {/* 悬浮按钮组 */}
      <div className="fixed bottom-8 right-8 flex gap-4 print:hidden z-40">
        {/* AI 记忆按钮 */}
        <button 
          onClick={() => setIsMemoryOpen(true)}
          className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 cursor-pointer border border-slate-700/50 backdrop-blur-sm"
        >
          <Brain size={20} className="text-blue-400" />
          AI 记忆库
        </button>

        {/* 下载/打印 PDF 按钮 */}
        <button 
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
        >
          <Download size={20} />
          下载 / 打印 PDF
        </button>
      </div>

      {/* 简历容器 */}
      <div className="resume-container max-w-[210mm] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none print:w-full print:rounded-none px-8 py-6 md:px-12 md:py-10 print:px-10 print:py-8">
        <Header profile={data.profile as unknown as Profile} />

        <div className="mt-5 space-y-6">
          <Experience experience={data.experience as unknown as ExperienceItem[]} />
          <Projects projects={data.projects as unknown as ProjectItem[]} />
          <Skills skills={data.skills as unknown as SkillGroup[]} />
          <Education education={data.education as unknown as EducationData} />
          <Languages languages={data.languages as unknown as LanguageItem[]} />
        </div>
      </div>

      {/* AI 记忆库弹窗 (Modal) */}
      {isMemoryOpen && (
        <>
          <div className="memory-modal-backdrop fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="memory-modal bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden border border-slate-100 animate-scale-up">
              {/* 弹窗头部 */}
              <div className="memory-modal-header bg-slate-800 text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Brain className="text-blue-400" size={24} />
                  <div>
                    <h3 className="font-bold text-lg leading-tight">AI 记忆库 / Context</h3>
                    <p className="text-xs text-slate-400 leading-normal">面试官与 AI 代理专用深度上下文</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMemoryOpen(false)}
                  className="hover:bg-slate-700/60 p-2 rounded-full transition-colors cursor-pointer text-slate-300 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 弹窗主体 (Markdown 内容) */}
              <div className="memory-modal-body flex-1 p-6 overflow-y-auto bg-slate-50/50">
                <article className="prose max-w-none">
                  {renderMarkdown(data.aiMemory)}
                </article>
              </div>

            {/* 弹窗底部 */}
            <div className="memory-modal-footer bg-slate-100 p-4 border-t border-slate-200/50 flex justify-between items-center gap-4">
              {/* 打印按钮 */}
              <button 
                onClick={handlePrintMemory}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 px-6 rounded-lg shadow transition-colors cursor-pointer text-sm flex items-center gap-2"
              >
                <Printer size={16} className="text-blue-400" />
                打印此内容
              </button>

              <button 
                onClick={() => setIsMemoryOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg shadow transition-colors cursor-pointer text-sm"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  );
};

export default App;
