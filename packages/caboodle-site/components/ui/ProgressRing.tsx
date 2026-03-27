'use client';

interface ProgressRingProps {
  percent: number;
  radius: number;
  color: string;
  strokeWidth?: number;
  trackColor?: string;
  trackFill?: string;
  cx: number;
  cy: number;
  className?: string;
  delayedClassName?: string;
}

export function ProgressRing({
  percent,
  radius,
  color,
  strokeWidth = 1.5,
  trackColor = 'var(--gray-200)',
  trackFill = 'none',
  cx,
  cy,
  className,
  delayedClassName,
}: ProgressRingProps) {
  const circumference = 2 * Math.PI * radius;
  const arc = (Math.min(Math.max(percent, 0), 100) / 100) * circumference;

  return (
    <>
      <circle
        cx={cx} cy={cy} r={radius}
        fill={trackFill}
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />
      {percent > 0 && (
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          className={`${className ?? ''}${delayedClassName ? ` ${delayedClassName}` : ''}`}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - arc}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      )}
    </>
  );
}
