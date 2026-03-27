'use client';

import { ProgressRing } from '@/components/ui/ProgressRing';

interface RosterRingProps {
  readingPercent: number;
  mathPercent: number;
  inactive?: boolean;
}

const OUTER_R = 20;
const INNER_R = 12;
const STROKE_WIDTH = 2;

export function RosterRing({ readingPercent, mathPercent, inactive = false }: RosterRingProps) {
  const readingColor = inactive ? 'var(--brand-light-grey)' : 'var(--color-subject-reading)';
  const mathColor = inactive ? 'var(--brand-light-grey)' : 'var(--color-subject-math)';

  return (
    <svg
      className="roster-ring"
      viewBox="0 0 42 42"
      role="img"
      aria-label={inactive ? 'No score data' : `Reading ${readingPercent}%, Math ${mathPercent}%`}
    >
      <ProgressRing
        percent={readingPercent}
        radius={OUTER_R}
        color={readingColor}
        strokeWidth={STROKE_WIDTH}
        trackFill="var(--white)"
        cx={21}
        cy={21}
        className="roster-ring-arc"
      />
      <ProgressRing
        percent={mathPercent}
        radius={INNER_R}
        color={mathColor}
        strokeWidth={STROKE_WIDTH}
        cx={21}
        cy={21}
        className="roster-ring-arc"
        delayedClassName="roster-ring-arc--delayed"
      />
    </svg>
  );
}
