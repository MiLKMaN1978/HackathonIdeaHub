import React, { useState } from 'react';
import type { Comment } from '../types';
import Button from './Button';

interface CommentSectionProps {
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'timestamp'>) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, addComment }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;
    addComment({ author, text });
    setAuthor('');
    setText('');
  };

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-3">Discussion</h4>
      <div className="space-y-4 mb-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-slate-900/50 p-3 rounded-lg">
              <div className="flex justify-between items-baseline">
                 <p className="font-semibold text-cyan-400 text-sm">{comment.author}</p>
                 <span className="text-xs text-slate-500">{new Date(comment.timestamp).toLocaleString()}</span>
              </div>
              <p className="text-slate-300 mt-1">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-slate-500 text-sm">No comments yet. Start the conversation!</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-slate-700/50 rounded-lg">
        <h5 className="font-semibold">Add a Comment</h5>
        <input
          type="text"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-sm"
        />
        <textarea
          placeholder="Your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-sm"
        />
        <div className="text-right">
          <Button type="submit" variant="secondary">Post Comment</Button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
