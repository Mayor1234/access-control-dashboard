import React, { type ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPortal from './RactPortal';
import { RiCloseLargeFill } from 'react-icons/ri';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return (): void => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-pry-text/60 pointer-events-auto"
              onClick={onClose}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden flex justify-end items-center">
              {onClose && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  type="button"
                  className="text-white rounded cursor-pointer text-sm w-fit px-3 py-2 transition-all duration-300 ease-in-out absolute z-50 top-5 right-0 hover:text-gray-400 focus:outline-none pointer-events-auto inline-flex justify-end"
                  aria-label="Close modal"
                  onClick={onClose}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onClose();
                    }
                  }}
                >
                  <RiCloseLargeFill className="w-5 h-5" />
                </motion.button>
              )}

              {/* Modal Content - Full Screen */}
              <motion.div
                initial={{ x: '-20%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="w-full h-full pointer-events-auto flex justify-end"
              >
                {children}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </ReactPortal>
  );
};

export default Modal;
