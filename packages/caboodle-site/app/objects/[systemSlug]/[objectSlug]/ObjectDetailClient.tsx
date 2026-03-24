'use client';

import type { ObjectDefinition } from '../../../../../../data/schema';
import { Tabs } from '@/components/ui/Tabs';
import { AttributeTable, CTATable } from '@/components/ui/DataTable';

interface ObjectDetailClientProps {
  obj: ObjectDefinition;
  systemSlug: string;
}

const LIST_SHAPES = new Set(['card', 'compact-card', 'row', 'mini-row', 'data-row', 'nested-card']);

function viewTypeLabel(shape: string): string {
  return LIST_SHAPES.has(shape) ? 'List' : 'Details';
}

function ViewCard({
  entry,
  objectSlug,
  systemSlug,
}: {
  entry: { context: string; value: string; shape: string; description: string; visibleAttributes: string[]; availableCTAs: string[] };
  objectSlug: string;
  systemSlug: string;
}) {
  const attrCount = entry.visibleAttributes.length;
  const ctaCount = entry.availableCTAs.length;

  return (
    <a className="card-base view-card" href={`/objects/${systemSlug}/${objectSlug}/views/${entry.value}`}>
      <div className="view-card-header">
        <div className="view-card-label">
          <i className="fa-solid fa-window-maximize" aria-hidden="true" />
          <strong>{entry.context}</strong>{' '}
          <span className="view-card-label-type">({viewTypeLabel(entry.shape)})</span>
        </div>
      </div>
      <div className="card-viz" aria-hidden="true" role="presentation" />
      <dl className="card-stat-bar">
        <div className="card-stat" title="Attributes">
          <dt><i className="fa-solid fa-table" aria-hidden="true" /><span className="sr-only">Attributes</span></dt>
          <dd>{attrCount}</dd>
        </div>
        <div className="card-stat" title="Actions">
          <dt><i className="fa-solid fa-location-arrow" aria-hidden="true" /><span className="sr-only">Actions</span></dt>
          <dd>{ctaCount}</dd>
        </div>
        <div className="card-stat" title="Nested objects">
          <dt><i className="fa-solid fa-link" aria-hidden="true" /><span className="sr-only">Nested objects</span></dt>
          <dd>0</dd>
        </div>
      </dl>
    </a>
  );
}

export function ObjectDetailClient({ obj, systemSlug }: ObjectDetailClientProps) {
  const views = obj.shapeshifterMatrix ?? [];

  return (
    <Tabs
      id={`obj-${obj.identity.slug}`}
      items={[
        {
          label: 'Views',
          icon: <i className="fa-solid fa-window-maximize tab-icon" aria-hidden="true" />,
        },
        {
          label: 'Attributes',
          icon: <i className="fa-solid fa-table tab-icon" aria-hidden="true" />,
        },
        {
          label: 'Actions',
          icon: <i className="fa-solid fa-location-arrow tab-icon" aria-hidden="true" />,
        },
        {
          label: 'Relationships',
          icon: <i className="fa-solid fa-circle-nodes tab-icon" aria-hidden="true" />,
        },
      ]}
      ariaLabel="Object detail sections"
    >
      {/* Views Tab */}
      <section className="l-content-area">
        <div className="center" style={{ '--max-inline-size': '960px', '--gutter': '0' } as React.CSSProperties}>
          <ul className="grid" style={{ '--min': '280px', '--space': 'var(--s0)' } as React.CSSProperties} role="list">
            {views.map(entry => (
              <li key={entry.value}>
                <ViewCard
                  entry={entry}
                  objectSlug={obj.identity.slug}
                  systemSlug={systemSlug}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Attributes Tab */}
      <section className="l-content-area">
        <div className="center stack" style={{ '--max-inline-size': '960px', '--gutter': '0', '--space': 'var(--s0)' } as React.CSSProperties}>
          <header>
            <h2 className="section-group-heading">All Attributes</h2>
            <p className="section-group-desc">
              Every data point {obj.identity.name} carries across all views and
              contexts.
            </p>
          </header>
          <AttributeTable attributes={obj.allAttributes} />
        </div>
      </section>

      {/* Actions Tab */}
      <section className="l-content-area">
        <div className="center stack" style={{ '--max-inline-size': '960px', '--gutter': '0', '--space': '2.5rem' } as React.CSSProperties}>
          <section aria-labelledby="all-actions-heading">
            <h2 id="all-actions-heading" className="section-group-heading">All Actions</h2>
            <p className="section-group-desc">
              Every action available on {obj.identity.name}, ranked by ORCA
              priority.
            </p>
            <div style={{ marginBlockStart: 'var(--s0)' }}>
              <CTATable ctas={obj.allCTAs} showPriority />
            </div>
          </section>

          {obj.stories.length > 0 && (
            <section aria-labelledby="user-stories-heading">
              <h2 id="user-stories-heading" className="section-group-heading">User Stories</h2>
              <div style={{ marginBlockStart: 'var(--s0)' }}>
                {obj.stories.map((story, i) => (
                  <div key={i} className="story-card">
                    <div className="story-card-header">
                      <span className="material-icons" aria-hidden="true">
                        {story.icon}
                      </span>
                      {story.title}
                    </div>
                    <div className="story-card-body">
                      <p className="story-field">
                        <span className="story-field-label">As a</span>{' '}
                        <strong>{story.role}</strong>,
                      </p>
                      <p className="story-field">
                        <span className="story-field-label">I want to</span>{' '}
                        <strong>{story.action}</strong> a{' '}
                        <strong>{story.object}</strong>
                      </p>
                      <p className="story-field">
                        <span className="story-field-label">so that</span>{' '}
                        {story.benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      {/* Relationships Tab */}
      <section className="l-content-area">
        <div className="center stack" style={{ '--max-inline-size': '960px', '--gutter': '0', '--space': '2.5rem' } as React.CSSProperties}>
          <section aria-labelledby="mcsfd-heading">
            <h2 id="mcsfd-heading" className="section-group-heading">Relationship Specs (MCSFD)</h2>
            <p className="section-group-desc">
              How {obj.identity.name} connects to each related object.
            </p>
            <div style={{ marginBlockStart: 'var(--s0)' }}>
              {obj.relationships.map((rel, i) => (
                <div key={i} className="relationship-card">
                  <div className="relationship-header">
                    <i className="fa-solid fa-arrows-rotate" aria-hidden="true" />
                    {obj.identity.name} &harr;{' '}
                    <a href={`/objects/${systemSlug}/${rel.targetSlug}`}>
                      {rel.targetName}
                    </a>
                  </div>
                  <table className="data-table">
                    <tbody>
                      <tr>
                        <th>Mechanics</th>
                        <td>{rel.mechanics}</td>
                      </tr>
                      <tr>
                        <th>Cardinality</th>
                        <td>{rel.cardinality}</td>
                      </tr>
                      <tr>
                        <th>Sorts</th>
                        <td>{rel.sorts}</td>
                      </tr>
                      <tr>
                        <th>Filters</th>
                        <td>{rel.filters}</td>
                      </tr>
                      <tr>
                        <th>Dependencies</th>
                        <td>{rel.dependencies}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>

          {obj.nestedObjects.length > 0 && (
            <section aria-labelledby="nested-objects-heading">
              <h2 id="nested-objects-heading" className="section-group-heading">Nested Objects</h2>
              <div
                className="nested-objects-list"
                style={{ marginBlockStart: 'var(--s0)' }}
              >
                {obj.nestedObjects.map((nested, i) => (
                  <a
                    key={i}
                    href={`/objects/${systemSlug}/${nested.slug}`}
                    className="nested-object-card"
                  >
                    <img
                      src="/img/object_icon.svg"
                      alt=""
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="nested-object-name">{nested.name}</div>
                      <div className="nested-object-cardinality">
                        {nested.cardinality}
                      </div>
                    </div>
                    <i className="fa-solid fa-chevron-right" aria-hidden="true" />
                    <div className="nested-object-desc">
                      {nested.description}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </Tabs>
  );
}
