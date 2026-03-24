'use client';
import { useId, useRef, useState, useCallback, type ReactNode, type KeyboardEvent } from 'react';

interface TabItem {
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  children: ReactNode[];
  variant?: 'secondary' | 'pill' | 'framework';
  ariaLabel?: string;
  defaultIndex?: number;
  id?: string;
}

export function Tabs({ items, children, variant = 'secondary', ariaLabel, defaultIndex = 0, id: externalId }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabClass = variant === 'secondary' ? 'secondary-tabs' : 'pill-tabs';
  const btnClass = variant === 'secondary' ? 'secondary-tab' : 'pill-tab';

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    let next = activeIndex;
    if (e.key === 'ArrowRight') next = (activeIndex + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (activeIndex - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else return;
    e.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }, [activeIndex, items.length]);

  return (
    <>
      <div className={tabClass} role="tablist" aria-label={ariaLabel}>
        {items.map((item, i) => (
          <button
            key={i}
            ref={el => { tabRefs.current[i] = el; }}
            id={`${id}-tab-${i}`}
            className={`${btnClass}${item.icon ? ' pill-tab-icon' : ''}`}
            role="tab"
            aria-selected={i === activeIndex}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(i)}
            onKeyDown={handleKeyDown}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
      {children.map((child, i) => (
        <div
          key={i}
          id={`${id}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== activeIndex}
          tabIndex={0}
        >
          {child}
        </div>
      ))}
    </>
  );
}
