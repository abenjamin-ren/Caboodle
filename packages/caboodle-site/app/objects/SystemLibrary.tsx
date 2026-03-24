'use client';

import type { SystemDefinition } from '../../../../data/schema';

interface SystemWithCounts extends SystemDefinition {
  objectCount: number;
  viewCount: number;
}

const SYSTEM_COLORS: Record<string, string> = {
  'common-objects': '#999',
  'renaissance-intelligence': '#CF3A4E',
  'freckle': '#F143AA',
  'nearpod': '#33B9FF',
  'star': '#FFE61F',
  'ar': '#F5692C',
  'myon': '#55efc4',
  'lalilo': '#31C0C4',
};

function formatUpdatedDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `Updated ${parseInt(m)}/${parseInt(d)}/${y.slice(2)}`;
}

function SystemCard({ system }: { system: SystemWithCounts }) {
  const color = SYSTEM_COLORS[system.slug] ?? '#6c5ce7';

  return (
    <a href={`/objects/${system.slug}`} className="card-base system-card">
      <div className="system-card-visual" aria-hidden="true" style={{ backgroundColor: color }}>
        <i className="fa-solid fa-layer-group system-card-icon" aria-hidden="true" />
      </div>
      <div className="system-card-meta">
        <div className="system-card-title">
          {system.name}
        </div>
        <div className="system-card-owner">
          Owned by {system.owner}
        </div>
        <div className="system-card-updated">
          {formatUpdatedDate(system.updatedAt)}
        </div>
      </div>
      <dl className="card-stat-bar">
        <div className="card-stat">
          <dt><i className="fa-solid fa-cube" aria-hidden="true" /><span className="sr-only">Objects</span></dt>
          <dd>{system.objectCount}</dd>
        </div>
        <div className="card-stat">
          <dt><i className="fa-solid fa-window-maximize" aria-hidden="true" /><span className="sr-only">Views</span></dt>
          <dd>{system.viewCount}</dd>
        </div>
      </dl>
    </a>
  );
}

export function SystemLibrary({ systems }: { systems: SystemWithCounts[] }) {
  return (
    <section className="l-content-area">
      <div className="center" style={{ '--max-inline-size': '960px', '--gutter': '0' } as React.CSSProperties}>
        <ul className="grid" style={{ '--min': '280px', '--space': 'var(--s0)' } as React.CSSProperties} role="list">
          {systems.map(sys => (
            <li key={sys.slug}><SystemCard system={sys} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
