import { useEffect, useRef } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export const Modal = ({ children, onClose, isOpen }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="p-0 bg-transparent backdrop:bg-black/50 rounded-lg max-w-4xl w-full"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
}; 