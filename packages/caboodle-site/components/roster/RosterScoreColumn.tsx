'use client';

interface RosterScoreColumnProps {
  subject: string;
  value: string;
  band: string;
  dotClass: string;
  selected?: boolean;
  href?: string;
}

function needsAttention(band: string): boolean {
  return band !== 'At/Above';
}

export function RosterScoreColumn({
  subject,
  value,
  band,
  dotClass,
  selected = false,
  href,
}: RosterScoreColumnProps) {
  const alert = needsAttention(band);

  const content = (
    <>
      <span className="roster-score-line">
        <span className="roster-score-inner">
          <span className={`roster-score-dot ${dotClass}`} />
          <span className="roster-score-label">
            {subject} <span className="roster-score-value">{value}</span>
          </span>
        </span>
        <i className="fa-solid fa-angle-right roster-chevron" aria-hidden="true" />
      </span>
      <span className={`roster-band${alert ? ' roster-band--alert' : ''}`}>
        {alert && (
          <i className="fa-solid fa-circle-exclamation roster-alert-icon" aria-label="Needs attention" />
        )}
        {band}
      </span>
    </>
  );

  const className = `roster-score-col${selected ? ' highlighted' : ''}`;

  if (href) {
    return (
      <a href={href} className={className} aria-label={`${subject} score: ${value}, ${band}`}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={className} aria-label={`${subject} score: ${value}, ${band}`}>
      {content}
    </button>
  );
}
