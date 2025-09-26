
import React, { useState } from 'react';
import { PlusIcon } from './icons/PlusIcon';

interface IdeaFormProps {
  onAddIdea: (title: string, description: string) => void;
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ onAddIdea }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onAddIdea(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="p-4 sm:p-6 mb-8 bg-slate-900 rounded-lg shadow-2xl border border-slate-700">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-slate-100">Have a new idea?</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Idea Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-shadow"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Describe your idea..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-md p-3 text-slate-200 h-24 resize-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-shadow"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-4 rounded-md hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          <PlusIcon className="w-5 h-5" />
          Add Idea
        </button>
      </form>
    </div>
  );
};
