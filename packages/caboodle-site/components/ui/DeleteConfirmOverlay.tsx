'use client';

import { useState, useRef, useEffect } from 'react';

interface DeleteConfirmOverlayProps {
  itemName: string;
  itemType?: string;
  isExiting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmOverlay({
  itemName,
  itemType = 'item',
  isExiting,
  onConfirm,
  onCancel,
}: DeleteConfirmOverlayProps) {
  const deleteRef = useRef<HTMLButtonElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setEntered(true);
      deleteRef.current?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const state = isExiting ? 'exiting' : entered ? 'entered' : 'entering';

  return (
    <div
      className="obj-confirm-overlay"
      data-state={state}
      role="alertdialog"
      aria-label={`Delete ${itemName}?`}
    >
      <div className="obj-confirm-content" data-state={state}>
        <span className="obj-confirm-msg">This action can&apos;t be undone.</span>
        <button
          ref={deleteRef}
          type="button"
          className="obj-confirm-delete"
          onClick={onConfirm}
        >
          Delete {itemType}
        </button>
      </div>
    </div>
  );
}
