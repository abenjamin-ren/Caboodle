'use client';

import type { CSSProperties } from 'react';

interface RosterRingProps {
  readingPercent: number;
  mathPercent: number;
  inactive?: boolean;
}

const OUTER_R = 20;
const INNER_R = 12;
const STROKE_WIDTH = 2;
const OUTER_C = 2 * Math.PI * OUTER_R;
const INNER_C = 2 * Math.PI * INNER_R;

export function RosterRing({ readingPercent, mathPercent, inactive = false }: RosterRingProps) {
  const readingArc = (readingPercent / 100) * OUTER_C;
  const mathArc = (mathPercent / 100) * INNER_C;

  const readingColor = inactive ? 'var(--brand-light-grey)' : 'var(--color-subject-reading)';
  const mathColor = inactive ? 'var(--brand-light-grey)' : 'var(--color-subject-math)';

  return (
    <svg
      className="roster-ring"
      viewBox="0 0 42 42"
      role="img"
      aria-label={inactive ? 'No score data' : `Reading ${readingPercent}%, Math ${mathPercent}%`}
    >
      <circle cx="21" cy="21" r={OUTER_R} fill="var(--white)" stroke="var(--gray-200)" strokeWidth={STROKE_WIDTH} />
      <circle cx="21" cy="21" r={INNER_R} fill="none" stroke="var(--gray-200)" strokeWidth={STROKE_WIDTH} />
      <circle
        cx="21" cy="21" r={OUTER_R} fill="none"
        className="roster-ring-arc"
        stroke={readingColor}
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={OUTER_C}
        strokeDashoffset={OUTER_C - readingArc}
        strokeLinecap="round"
        transform="rotate(-90 21 21)"
        style={{ '--ring-full': OUTER_C } as CSSProperties}
      />
      <circle
        cx="21" cy="21" r={INNER_R} fill="none"
        className="roster-ring-arc roster-ring-arc--delayed"
        stroke={mathColor}
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={INNER_C}
        strokeDashoffset={INNER_C - mathArc}
        strokeLinecap="round"
        transform="rotate(-90 21 21)"
        style={{ '--ring-full': INNER_C } as CSSProperties}
      />
    </svg>
  );
}
