import React from 'react';
import type { Idea } from '../types';
import IdeaCard from './IdeaCard';

interface IdeaBoardProps {
  ideas: Idea[];
  onSelectIdea: (idea: Idea) => void;
}

const IdeaBoard: React.FC<IdeaBoardProps> = ({ ideas, onSelectIdea }) => {
  if (ideas.length === 0) {
    return (
        <div className="text-center py-10 px-4">
            <h2 className="text-2xl font-semibold text-slate-300">No Ideas Yet!</h2>
            <p className="text-slate-500 mt-2">Be the first to share a brilliant idea using the form above.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onSelect={onSelectIdea} />
      ))}
    </div>
  );
};

export default IdeaBoard;
