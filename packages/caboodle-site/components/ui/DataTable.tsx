import type { ObjectAttribute, ObjectCTA } from '../../../../data/schema';

interface AttributeTableProps {
  attributes: ObjectAttribute[];
  visibleRoles?: string[];
  visibleNames?: string[];
}

export function AttributeTable({ attributes, visibleRoles, visibleNames }: AttributeTableProps) {
  let filtered = visibleRoles
    ? attributes.filter(a => !a.roles || a.roles.some(r => visibleRoles.includes(r)))
    : attributes;

  if (visibleNames) {
    filtered = filtered.filter(a => visibleNames.includes(a.name));
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th className="col-attr">Attribute</th>
          <th className="col-type">Data type</th>
          <th className="col-source">Source</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((attr, i) => (
          <tr key={i}>
            <td>
              {attr.isReference && attr.referenceSlug ? (
                <a href={`/objects/${attr.referenceSlug}`} className="attr-ref">
                  <img src="/img/object_icon.svg" alt="" className="attr-ref-icon" />
                  {attr.name}
                  <span className="material-icons" aria-hidden="true">arrow_right_alt</span>
                </a>
              ) : (
                <span className="attr-name">{attr.name}</span>
              )}
              {attr.required && <span className="required-badge">Required</span>}
            </td>
            <td>{attr.dataType}</td>
            <td>{attr.source}</td>
            <td>{attr.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface CTATableProps {
  ctas: ObjectCTA[];
  showPriority?: boolean;
  visibleRoles?: string[];
  visibleNames?: string[];
}

export function CTATable({ ctas, showPriority, visibleRoles, visibleNames }: CTATableProps) {
  let filtered = visibleRoles && visibleRoles[0] !== 'all'
    ? ctas.filter(c => !c.roleKeys || c.roleKeys.some(r => visibleRoles.includes(r)))
    : ctas;

  if (visibleNames) {
    filtered = filtered.filter(c => visibleNames.includes(c.name));
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th className="col-attr">CTA</th>
          {showPriority && <th style={{ inlineSize: 60 }}>Priority</th>}
          <th className="col-type">Roles</th>
          <th>{showPriority ? 'Cross-object' : 'Permission'}</th>
          {!showPriority && <th>Cross-object</th>}
        </tr>
      </thead>
      <tbody>
        {filtered.map((cta, i) => (
          <tr key={i}>
            <td><span className="attr-name">{cta.name}</span></td>
            {showPriority && (
              <td>
                <span className={`priority-badge priority-badge--${cta.priority.toLowerCase()}`}>
                  {cta.priority}
                </span>
              </td>
            )}
            <td>{cta.roles}</td>
            {!showPriority && <td>{cta.permission}</td>}
            <td>
              {cta.crossObjectSlug ? (
                <a href={`/objects/${cta.crossObjectSlug}`} className="attr-ref">
                  <img src="/img/object_icon.svg" alt="" className="attr-ref-icon" />
                  {cta.crossObjectName}
                  <span className="material-icons" aria-hidden="true">arrow_right_alt</span>
                </a>
              ) : '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
