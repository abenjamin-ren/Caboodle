'use client';

import { useRef, useEffect, useCallback } from 'react';

export interface RosterMenuItem {
  label: string;
  onClick?: () => void;
}

interface RosterOverflowMenuProps {
  items: RosterMenuItem[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  selected?: boolean;
}

export function RosterOverflowMenu({
  items,
  open,
  onToggle,
  onClose,
  selected = false,
}: RosterOverflowMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  useEffect(() => {
    if (open && itemRefs.current[0]) {
      itemRefs.current[0].focus();
    }
  }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) return;

    const focusedIdx = itemRefs.current.findIndex(el => el === document.activeElement);

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = focusedIdx < items.length - 1 ? focusedIdx + 1 : 0;
        itemRefs.current[next]?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = focusedIdx > 0 ? focusedIdx - 1 : items.length - 1;
        itemRefs.current[prev]?.focus();
        break;
      }
      case 'Home':
        e.preventDefault();
        itemRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        itemRefs.current[items.length - 1]?.focus();
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
        break;
      case 'Tab':
        onClose();
        break;
    }
  }, [open, items.length, onClose]);

  if (items.length === 0) return null;

  return (
    <div className="roster-menu-container" ref={containerRef}>
      <button
        ref={triggerRef}
        className={`roster-menu-trigger${open ? ' roster-menu-trigger--active' : ''}${selected ? ' highlighted' : ''}`}
        type="button"
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
      >
        <svg width="3" height="12" viewBox="0 0 3 12" fill="currentColor" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="1.5" />
          <circle cx="1.5" cy="6" r="1.5" />
          <circle cx="1.5" cy="10.5" r="1.5" />
        </svg>
      </button>
      {open && (
        <div className="roster-menu" role="menu" onKeyDown={handleKeyDown}>
          {items.map((item, i) => (
            <button
              key={item.label}
              ref={el => { itemRefs.current[i] = el; }}
              className="roster-menu-item"
              type="button"
              role="menuitem"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick?.();
                onClose();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
