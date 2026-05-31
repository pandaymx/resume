import React, { useState } from 'react';
import { Download, Brain, X, Printer } from 'lucide-react';

// Import data
import * as data from './data/resume';

// Import split components
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';

const App: React.FC = () => {
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const handlePrint = () => window.print();

  // Print only the AI Memory contents (print styling is dynamically injected when modal is open)
  const handlePrintMemory = () => {
    window.print();
  };

  // Custom high-performance markdown parser for rendering raw md strings with rich styling
  const renderMarkdown = (text: any) => {
    const markdownString = typeof text === 'string' 
      ? text 
      : (text && typeof text === 'object' && 'default' in text ? text.default : '');

    if (!markdownString || typeof markdownString !== 'string') {
      return <p className="text-slate-500 text-sm">正在加载数据或数据格式错误...</p>;
    }

    // Recursively parse inline bold (**text**) and code blocks (`text`)
    const parseInline = (inlineText: string): React.ReactNode[] => {
      const regex = /(\*\*.*?\*\*|`.*?`)/g;
      const parts = inlineText.split(regex);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index} className="px-1.5 py-0.5 bg-slate-100 text-blue-600 text-xs rounded font-mono border border-slate-200/50 mx-0.5 font-medium">
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      });
    };

    return markdownString.split('\n').map((line, i) => {
      const leadingSpaces = line.search(/\S/);
      const trimmed = line.trim();

      if (trimmed === '') {
        return <div key={i} className="h-2" />;
      }

      // 1. Divider
      if (trimmed.startsWith('---')) {
        return <hr key={i} className="my-5 border-slate-200" />;
      }

      // 2. Headings
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={i} className="text-2xl font-bold mt-6 mb-3 text-slate-800 border-b pb-2 border-slate-200">
            {parseInline(trimmed.replace('# ', ''))}
          </h1>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="text-lg font-bold mt-5 mb-2.5 text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full inline-block"></span>
            {parseInline(trimmed.replace('## ', ''))}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="text-sm font-bold mt-4 mb-2 text-slate-700">
            {parseInline(trimmed.replace('### ', ''))}
          </h3>
        );
      }

      // 3. Unordered Lists (bullet points, supporting leading spaces indentation)
      const ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
      if (ulMatch) {
        const indentStyle = leadingSpaces > 0 ? { marginLeft: `${leadingSpaces * 6}px` } : { marginLeft: '16px' };
        return (
          <li key={i} style={indentStyle} className="list-disc text-slate-600 my-1 text-sm leading-relaxed">
            {parseInline(ulMatch[1])}
          </li>
        );
      }

      // 4. Numbered Lists
      const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (olMatch) {
        const num = parseInt(olMatch[1], 10);
        const indentStyle = leadingSpaces > 0 ? { marginLeft: `${leadingSpaces * 6}px` } : { marginLeft: '16px' };
        return (
          <li key={i} value={num} style={indentStyle} className="list-decimal text-slate-600 my-1 text-sm leading-relaxed">
            {parseInline(olMatch[2])}
          </li>
        );
      }

      // 5. Normal Paragraphs
      return (
        <p key={i} className="text-slate-600 my-1.5 leading-relaxed text-sm">
          {parseInline(trimmed)}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans print:p-0 print:bg-white relative">
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
      <div className="resume-container max-w-[210mm] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none print:w-full print:rounded-none">
        <Header profile={data.profile} />

        <div className="flex flex-col md:flex-row print:flex-row">
          <Sidebar 
            skills={data.skills} 
            education={data.education} 
            languages={data.languages}
            evaluation={data.evaluation}
          />
          
          <MainContent 
            experience={data.experience} 
            projects={data.projects} 
          />
        </div>
      </div>

      {/* AI 记忆库弹窗 (Modal) */}
      {isMemoryOpen && (
        <>
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                background: white !important;
              }
              /* Hide resume and controls */
              .resume-container,
              .fixed.bottom-8,
              .print\\:hidden,
              button,
              .memory-modal-header,
              .memory-modal-footer {
                display: none !important;
              }
              
              /* Reset backdrop/modal wrapper to be a clean printable document flow */
              .memory-modal-backdrop {
                position: static !important;
                display: block !important;
                background: white !important;
                backdrop-filter: none !important;
                padding: 0 !important;
                margin: 0 !important;
                width: 100% !important;
                height: auto !important;
                overflow: visible !important;
                z-index: auto !important;
                animation: none !important;
              }
              
              .memory-modal {
                max-width: 100% !important;
                width: 100% !important;
                max-height: none !important;
                height: auto !important;
                box-shadow: none !important;
                border: none !important;
                border-radius: 0 !important;
                background: white !important;
                overflow: visible !important;
                animation: none !important;
              }
              
              .memory-modal-body {
                overflow: visible !important;
                max-height: none !important;
                height: auto !important;
                padding: 0 !important;
                background: white !important;
              }
            }
          `}} />
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
