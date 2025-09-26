import React from 'react';

const Spinner = ({ size = 'w-5 h-5' }: { size?: string }) => {
  return (
    <div
      className={`${size} animate-spin rounded-full border-2 border-slate-400 border-t-transparent`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
