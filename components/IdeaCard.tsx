
import React, { useState } from 'react';
import type { Idea } from '../types';
import { ChatIcon } from './icons/ChatIcon';
import { HeartIcon } from './icons/HeartIcon';

interface IdeaCardProps {
  idea: Idea;
  onLike: (id: string) => void;
  onDiscuss: (idea: Idea) => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onLike, onDiscuss }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        onLike(idea.id);
        setIsLiked(!isLiked);
    };

    const timeAgo = (timestamp: number) => {
        const seconds = Math.floor((new Date().getTime() - timestamp) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 shadow-lg border border-slate-700 flex flex-col justify-between transform hover:-translate-y-1 transition-transform duration-300">
      <div>
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-cyan-300">{idea.title}</h3>
            <span className="text-xs text-slate-500">{timeAgo(idea.timestamp)}</span>
        </div>
        <p className="text-slate-300 mt-2 text-sm">{idea.description}</p>
      </div>
      <div className="flex justify-end items-center mt-6 gap-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors ${isLiked ? 'text-pink-500' : ''}`}
        >
          <HeartIcon liked={isLiked} className="w-6 h-6" />
          <span className="font-medium">{idea.likes}</span>
        </button>
        <button
          onClick={() => onDiscuss(idea)}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ChatIcon className="w-6 h-6" />
          <span className="font-medium">Discuss</span>
        </button>
      </div>
    </div>
  );
};
