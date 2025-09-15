import React, { type ReactNode, useEffect } from 'react';

import ReactPortal from './RactPortal';
import { RiCloseLargeFill } from 'react-icons/ri';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Close the model with the esc key
  useEffect(() => {
    if (!onClose) return;
    const closeOnEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.body.addEventListener('keydown', closeOnEscKey);
    return (): void => {
      document.body.removeEventListener('keydown', closeOnEscKey);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return (): void => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className="fixed inset-0 z-30 w-full h-screen bg-pry-text/60 pointer-events-auto">
        <div className="z-40 flex justify-end items-center h-full w-full">
          {onClose && (
            <button
              type="button"
              className="text-white rounded cursor-pointer text-sm w-fit px-3 py-2 ml-auto inline-flex justify-end items-center transition-all duration-300 ease-in-out absolute z-50 top-5 right-5 md:top-5 md:right-5 hover:text-gray-400 focus:outline-none"
              data-modal-toggle="defaultModal"
              aria-label="Close modal"
              aria-expanded="false"
              aria-controls="defaultModal"
              role="button"
              title="Close modal"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onClose();
                }
              }}
              onClick={onClose}
            >
              <RiCloseLargeFill className="w-5 h-5" />
            </button>
          )}
          {children}
        </div>
      </div>
    </ReactPortal>
  );
};

export default Modal;
