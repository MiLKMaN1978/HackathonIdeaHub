import React from 'react';
import type { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
  onSelect: (idea: Idea) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(idea)}
      className="bg-slate-800 p-6 rounded-lg border border-slate-700 cursor-pointer transition-all duration-300 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      <h3 className="text-xl font-bold text-slate-100 mb-2 truncate">{idea.title}</h3>
      <p className="text-slate-400 text-sm mb-4 h-10 overflow-hidden text-ellipsis">
        {idea.description}
      </p>
      <div className="flex justify-between items-center text-xs text-slate-500">
        <span>by {idea.author}</span>
        <span>{idea.comments.length} comments</span>
      </div>
    </div>
  );
};

export default IdeaCard;
