'use client';

import type { SystemDefinition, ObjectDefinition } from '../../../../../data/schema';
import { objectIconSrc } from '@/components/ui/ObjectIcon';

interface SystemDetailProps {
  system: SystemDefinition;
  objects: ObjectDefinition[];
}

function ObjectCard({ obj, systemSlug }: { obj: ObjectDefinition; systemSlug: string }) {
  const iconSrc = objectIconSrc(obj.identity.objectType);
  const viewCount = obj.shapeshifterMatrix?.length ?? 0;
  const attrCount = obj.allAttributes.length;
  const ctaCount = obj.allCTAs.length;
  const relCount = obj.relationships.length;

  return (
    <a
      href={`/objects/${systemSlug}/${obj.identity.slug}`}
      className="card-base object-card"
    >
      <div className="object-card-header">
        <div className="object-card-header-top">
          <img
            className="object-card-icon"
            src={iconSrc}
            alt=""
            width={40}
            height={40}
          />
          <div className="object-card-meta">
            <div className="object-card-name">
              {obj.identity.name}{' '}
              {obj.identity.qualifier && <span>{obj.identity.qualifier}</span>}
            </div>
            <div className="object-card-updated">Updated 2/28/26</div>
          </div>
        </div>
      </div>
      <div className="card-viz" aria-hidden="true" />
      <dl className="card-stat-bar">
        <div className="card-stat" title="Views">
          <dt><i className="fa-solid fa-window-maximize" aria-hidden="true" /><span className="sr-only">Views</span></dt>
          <dd>{viewCount}</dd>
        </div>
        <div className="card-stat" title="Attributes">
          <dt><i className="fa-solid fa-table" aria-hidden="true" /><span className="sr-only">Attributes</span></dt>
          <dd>{attrCount}</dd>
        </div>
        <div className="card-stat" title="Actions">
          <dt><i className="fa-solid fa-location-arrow" aria-hidden="true" /><span className="sr-only">Actions</span></dt>
          <dd>{ctaCount}</dd>
        </div>
        <div className="card-stat" title="Relationships">
          <dt><i className="fa-solid fa-circle-nodes" aria-hidden="true" /><span className="sr-only">Relationships</span></dt>
          <dd>{relCount}</dd>
        </div>
      </dl>
    </a>
  );
}

export function SystemDetail({ system, objects }: SystemDetailProps) {
  return (
    <section className="l-content-area">
      <div className="center" style={{ '--max-inline-size': '960px', '--gutter': '0' } as React.CSSProperties}>
        <ul className="grid" style={{ '--min': '280px', '--space': 'var(--s0)' } as React.CSSProperties} role="list">
          {objects.map(obj => (
            <li key={obj.identity.slug}>
              <ObjectCard obj={obj} systemSlug={system.slug} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
