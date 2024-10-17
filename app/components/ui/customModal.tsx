import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from './button'; // Assuming the Button component is in the same directory
import { cn } from "../../lib/utils"; // Make sure to import the cn function

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, message, title = "Confirmation" }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={cn(
          "bg-card text-card-foreground rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden",
          "border border-border"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 id="modal-title" className="text-xl font-bold">
              {title}
            </h2>
            <Button
              ref={closeButtonRef}
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground mb-6">{message}</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;