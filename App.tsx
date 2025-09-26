
import React, { useState, useCallback } from 'react';
import type { Idea } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { IdeaForm } from './components/IdeaForm';
import { IdeaList } from './components/IdeaList';
import { DiscussionModal } from './components/DiscussionModal';

const App: React.FC = () => {
  const [ideas, setIdeas] = useLocalStorage<Idea[]>('hackathon-ideas', []);
  const [activeIdea, setActiveIdea] = useState<Idea | null>(null);

  const sortedIdeas = React.useMemo(() => {
    return [...ideas].sort((a, b) => b.timestamp - a.timestamp);
  }, [ideas]);

  const handleAddIdea = useCallback((title: string, description: string) => {
    const newIdea: Idea = {
      id: crypto.randomUUID(),
      title,
      description,
      likes: 0,
      timestamp: Date.now(),
    };
    setIdeas(prevIdeas => [...prevIdeas, newIdea]);
  }, [setIdeas]);

  const handleLike = useCallback((id: string) => {
    setIdeas(prevIdeas =>
      prevIdeas.map(idea =>
        idea.id === id ? { ...idea, likes: idea.likes + 1 } : idea
      )
    );
  }, [setIdeas]);

  const handleOpenDiscussion = (idea: Idea) => {
    setActiveIdea(idea);
  };

  const handleCloseDiscussion = () => {
    setActiveIdea(null);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        <IdeaForm onAddIdea={handleAddIdea} />
        <IdeaList ideas={sortedIdeas} onLike={handleLike} onDiscuss={handleOpenDiscussion} />
      </main>
      <DiscussionModal idea={activeIdea} onClose={handleCloseDiscussion} />
    </div>
  );
};

export default App;
