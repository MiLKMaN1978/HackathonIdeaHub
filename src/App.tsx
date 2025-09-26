import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IdeaForm from './components/IdeaForm';
import IdeaBoard from './components/IdeaBoard';
import IdeaDetailModal from './components/IdeaDetailModal';
import type { Idea } from './types';

const INITIAL_IDEAS: Idea[] = [
    {
        id: 1,
        title: "Gamified Fitness App for Remote Teams",
        description: "An application that connects remote colleagues through fitness challenges. Users can form teams, log workouts, and earn points. Integrates with popular fitness trackers. The goal is to boost morale and health in a distributed workforce.",
        author: "Grace Hopper",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        comments: [
            { id: 1, author: "Alan Turing", text: "Interesting concept! How would you prevent cheating?", timestamp: new Date(Date.now() - 43200000).toISOString() },
            { id: 2, author: "Ada Lovelace", text: "We could use GPS data for runs/walks and maybe even video confirmation for home workouts.", timestamp: new Date(Date.now() - 36000000).toISOString() }
        ]
    },
    {
        id: 2,
        title: "AI-Powered Recipe Generator",
        description: "A tool that generates unique recipes based on ingredients a user has at home. Users can input their available ingredients, dietary restrictions, and desired cuisine, and the AI will create a recipe for them. Could also generate shopping lists for missing items.",
        author: "John von Neumann",
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        comments: []
    }
];

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // In a real app, you might fetch this from localStorage or an API
    setIdeas(INITIAL_IDEAS);
  }, []);

  const addIdea = (newIdeaData: Omit<Idea, 'id' | 'timestamp' | 'comments'>) => {
    const newIdea: Idea = {
      ...newIdeaData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      comments: [],
    };
    setIdeas([newIdea, ...ideas]);
  };

  const updateIdea = (updatedIdea: Idea) => {
    setIdeas(ideas.map(idea => idea.id === updatedIdea.id ? updatedIdea : idea));
    if (selectedIdea && selectedIdea.id === updatedIdea.id) {
        setSelectedIdea(updatedIdea);
    }
  };

  const handleSelectIdea = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIdea(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 pb-12">
        <IdeaForm addIdea={addIdea} />
        <IdeaBoard ideas={ideas} onSelectIdea={handleSelectIdea} />
      </main>
      <IdeaDetailModal
        idea={selectedIdea}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        updateIdea={updateIdea}
      />
    </div>
  );
};

export default App;
