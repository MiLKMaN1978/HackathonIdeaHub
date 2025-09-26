import React, { useState } from 'react';
import type { Idea, Comment, TechStackSuggestion } from '../types';
import Modal from './Modal';
import CommentSection from './CommentSection';
import Button from './Button';
import { SparklesIcon } from '../constants';
import { summarizeCommentsWithAI, suggestTechStackWithAI } from '../services/geminiService';
import Spinner from './Spinner';

interface IdeaDetailModalProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
  updateIdea: (updatedIdea: Idea) => void;
}

const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({ idea, isOpen, onClose, updateIdea }) => {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [techStack, setTechStack] = useState<TechStackSuggestion | null>(null);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!idea) return;
    setIsSummarizing(true);
    setError('');
    setSummary('');
    try {
      const result = await summarizeCommentsWithAI(idea);
      setSummary(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSuggestTech = async () => {
    if (!idea) return;
    setIsSuggesting(true);
    setError('');
    setTechStack(null);
    try {
        const result = await suggestTechStackWithAI(idea);
        setTechStack(result);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
        setIsSuggesting(false);
    }
  };

  const addComment = (comment: Omit<Comment, 'id' | 'timestamp'>) => {
    if (!idea) return;
    const newComment: Comment = {
      ...comment,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    const updatedIdea = { ...idea, comments: [...idea.comments, newComment] };
    updateIdea(updatedIdea);
  };

  if (!idea) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={idea.title}>
        <div className="space-y-4">
            <div className="text-sm text-slate-400">
                <span>Submitted by <span className="font-semibold text-slate-300">{idea.author}</span> on {new Date(idea.timestamp).toLocaleDateString()}</span>
            </div>
            <p className="text-slate-300 whitespace-pre-wrap">{idea.description}</p>
        </div>
        <hr className="my-6 border-slate-700" />
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4">
                <h4 className="text-lg font-semibold">AI Assistant</h4>
            </div>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <Button onClick={handleSummarize} isLoading={isSummarizing} leftIcon={<SparklesIcon className="w-4 h-4" />}>
                Summarize Discussion
              </Button>
               <Button onClick={handleSuggestTech} isLoading={isSuggesting} leftIcon={<SparklesIcon className="w-4 h-4" />}>
                Suggest Tech Stack
              </Button>
            </div>
            {isSummarizing && <div className="mt-4 p-4 bg-slate-900/50 rounded-lg flex items-center gap-2 text-slate-400"><Spinner size="w-4 h-4"/>Generating summary...</div>}
            {summary && <div className="mt-4 p-4 bg-slate-900/50 rounded-lg text-slate-300">{summary}</div>}

            {isSuggesting && <div className="mt-4 p-4 bg-slate-900/50 rounded-lg flex items-center gap-2 text-slate-400"><Spinner size="w-4 h-4"/>Generating tech stack...</div>}
            {techStack && (
                 <div className="mt-4 p-4 bg-slate-900/50 rounded-lg space-y-3">
                    {Object.entries(techStack).map(([category, details]) => (
                        <div key={category}>
                            <h5 className="font-bold capitalize text-cyan-400">{category}: <span className="font-semibold text-slate-200">{details.tech}</span></h5>
                            <p className="text-sm text-slate-400 ml-2">{details.reason}</p>
                        </div>
                    ))}
                 </div>
            )}
          </div>
        </div>
        <CommentSection comments={idea.comments} addComment={addComment} />
    </Modal>
  );
};

export default IdeaDetailModal;
