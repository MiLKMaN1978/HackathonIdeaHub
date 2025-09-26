
import React from 'react';

const Header = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          Hackathon Idea Hub
        </h1>
        <p className="mt-2 text-slate-400">
          Share, Discuss, and Build the Next Big Thing.
        </p>
      </div>
    </header>
  );
};

export default Header;
