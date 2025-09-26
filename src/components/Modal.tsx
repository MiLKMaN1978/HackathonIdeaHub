import React, { useEffect } from 'react';
import { CloseIcon } from '../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl mx-4 my-8 bg-slate-800 rounded-lg shadow-xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-5 border-b border-slate-700 rounded-t">
          <h3 className="text-2xl font-bold text-slate-100" id="modal-title">
            {title}
          </h3>
          <button
            type="button"
            className="p-1 ml-auto bg-transparent rounded-md text-slate-400 hover:bg-slate-700 hover:text-slate-100"
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
