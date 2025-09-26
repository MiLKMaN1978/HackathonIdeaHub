
import React from 'react';
import type { Idea } from '../types';
import { IdeaCard } from './IdeaCard';

interface IdeaListProps {
  ideas: Idea[];
  onLike: (id: string) => void;
  onDiscuss: (idea: Idea) => void;
}

export const IdeaList: React.FC<IdeaListProps> = ({ ideas, onLike, onDiscuss }) => {
  if (ideas.length === 0) {
    return (
        <div className="text-center py-16 px-4">
            <h2 className="text-2xl font-bold text-slate-400">No ideas yet!</h2>
            <p className="text-slate-500 mt-2">Be the first to share an amazing idea for the hackathon.</p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onLike={onLike} onDiscuss={onDiscuss} />
      ))}
    </div>
  );
};
