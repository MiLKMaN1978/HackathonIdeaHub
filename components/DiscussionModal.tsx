
import React, { useState, useEffect, useRef } from 'react';
import type { Idea, ChatMessage } from '../types';
import { getCollaborativeResponse } from '../services/geminiService';
import { CloseIcon } from './icons/CloseIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface DiscussionModalProps {
  idea: Idea | null;
  onClose: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
    </div>
);


export const DiscussionModal: React.FC<DiscussionModalProps> = ({ idea, onClose }) => {
  const [discussion, setDiscussion] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (idea) {
      setDiscussion([{ role: 'model', text: `Let's brainstorm on "${idea.title}"! What are your initial thoughts or questions?` }]);
    } else {
        setDiscussion([]);
        setUserInput('');
    }
  }, [idea]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [discussion, isLoading]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !idea) return;

    const newUserMessage: ChatMessage = { role: 'user', text: userInput };
    const newDiscussion = [...discussion, newUserMessage];
    setDiscussion(newDiscussion);
    setUserInput('');
    setIsLoading(true);

    const modelResponseText = await getCollaborativeResponse(idea, newDiscussion, userInput);

    setDiscussion(prev => [...prev, { role: 'model', text: modelResponseText }]);
    setIsLoading(false);
  };

  if (!idea) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 w-full max-w-2xl rounded-lg shadow-2xl border border-slate-700 flex flex-col h-[90vh]">
        <header className="p-4 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-cyan-400">{idea.title}</h2>
            <p className="text-sm text-slate-400">AI Collaboration Session</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto space-y-6">
          {discussion.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-white"/></div>}
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-300 rounded-bl-none'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-white"/></div>
               <div className="max-w-[80%] rounded-lg px-4 py-3 bg-slate-800 text-slate-300 rounded-bl-none">
                <LoadingSpinner />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <footer className="p-4 border-t border-slate-700">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Add to the discussion..."
              className="flex-1 bg-slate-800 border border-slate-600 rounded-full py-2 px-4 text-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none transition"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-cyan-500 text-white rounded-full p-2 hover:bg-cyan-600 disabled:bg-slate-600 transition-colors"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086L2.279 16.76a.75.75 0 00.95.826l16-5.333a.75.75 0 000-1.418l-16-5.333z" />
              </svg>
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};
