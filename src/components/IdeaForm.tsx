import React, { useState } from 'react';
import type { Idea } from '../types';
import Button from './Button';
import { SparklesIcon } from '../constants';
import { refineIdeaWithAI } from '../services/geminiService';

interface IdeaFormProps {
  addIdea: (idea: Omit<Idea, 'id' | 'timestamp' | 'comments'>) => void;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ addIdea }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState('');

  const handleRefine = async () => {
    if (!title && !description) {
      setError("Please provide a title or description to refine.");
      return;
    }
    setError('');
    setIsRefining(true);
    try {
      const { newTitle, newDescription } = await refineIdeaWithAI(title, description);
      setTitle(newTitle);
      setDescription(newDescription);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !author) {
      setError("All fields are required.");
      return;
    }
    setError('');
    addIdea({ title, description, author });
    setTitle('');
    setDescription('');
    setAuthor('');
  };

  return (
    <div className="p-6 mb-8 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-slate-100">Submit a New Idea</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-slate-400">Your Name</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Ada Lovelace"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-400">Idea Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="AI-Powered Personal Chef"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-400">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Describe your brilliant idea..."
          />
        </div>
         {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
            <Button
                type="button"
                variant="secondary"
                onClick={handleRefine}
                isLoading={isRefining}
                leftIcon={<SparklesIcon className="w-4 h-4" />}
            >
                Refine with AI
            </Button>
            <Button type="submit">Submit Idea</Button>
        </div>
      </form>
    </div>
  );
};

export default IdeaForm;
