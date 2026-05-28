import React from 'react';
import { Download } from 'lucide-react';

// 导入数据
import * as data from './data/resume';

// 导入拆分的组件
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';

const App: React.FC = () => {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans print:p-0 print:bg-white">
      {/* 悬浮下载按钮 */}
      <button 
        onClick={handlePrint}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 print:hidden z-50 cursor-pointer"
      >
        <Download size={20} />
        下载 / 打印 PDF
      </button>

      {/* 简历容器 */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none print:w-full print:rounded-none">
        
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
    </div>
  );
};

export default App;
