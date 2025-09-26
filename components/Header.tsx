
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm p-4 text-center border-b border-slate-700 sticky top-0 z-10">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Hackathon Idea Hub
      </h1>
      <p className="text-slate-400 mt-1 flex items-center justify-center gap-2">
        Share, Discuss, and Collaborate with Gemini <SparklesIcon className="w-4 h-4 text-cyan-400" />
      </p>
    </header>
  );
};
