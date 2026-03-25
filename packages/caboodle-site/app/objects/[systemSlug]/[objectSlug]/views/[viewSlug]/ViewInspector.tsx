'use client';

import { useState, useMemo, useTransition, useRef, useEffect } from 'react';
import type {
  ObjectDefinition,
  ShapeshifterEntry,
  ObjectAttribute,
  ObjectCTA,
  LifecycleState,
} from '../../../../../../../../data/schema';
import { updateAttribute, updateCTA } from '@/app/actions';
import { getPreviewRenderer } from '@/lib/preview-registry';
import { getHighlightedStudents, getAllTeachers, getAllClasses } from '@/lib/mock';

interface ViewInspectorProps {
  obj: ObjectDefinition;
  view: ShapeshifterEntry;
  systemSlug: string;
}

type SelectedItem =
  | { type: 'attribute'; name: string }
  | { type: 'action'; name: string }
  | null;

const ROLES = ['teacher', 'admin', 'student'] as const;

const PRIORITY_LABELS: Record<string, string> = {
  P: 'Primary',
  S: 'Secondary',
  T: 'Tertiary',
  Q: 'Quaternary',
};

export function ViewInspector({ obj, view, systemSlug }: ViewInspectorProps) {
  const [selectedRole, setSelectedRole] = useState<string>('teacher');
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [previewMode, setPreviewMode] = useState<'preview' | 'outline'>('preview');
  const [displayMode, setDisplayMode] = useState<'list' | 'grid' | 'table'>('list');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ctaRoleOverrides, setCtaRoleOverrides] = useState<Record<string, string[]>>({});
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [dropdownOpen]);

  const viewAttributes = useMemo(() => {
    return view.visibleAttributes
      .map(name => obj.allAttributes.find(a => a.name === name))
      .filter((a): a is ObjectAttribute => a != null);
  }, [view.visibleAttributes, obj.allAttributes]);

  const viewCTAs = useMemo(() => {
    return view.availableCTAs
      .map(name => obj.allCTAs.find(c => c.name === name))
      .filter((c): c is ObjectCTA => c != null);
  }, [view.availableCTAs, obj.allCTAs]);

  const lifecycleStates = obj.lifecycle.states;

  const isAttrVisibleForRole = (attr: ObjectAttribute): boolean => {
    if (!attr.roles?.length) return true;
    return attr.roles.includes(selectedRole);
  };

  const isActionAvailableForRole = (cta: ObjectCTA): boolean => {
    if (!cta.roleKeys?.length) return true;
    return cta.roleKeys.includes(selectedRole);
  };

  const selectedAttr = selectedItem?.type === 'attribute'
    ? obj.allAttributes.find(a => a.name === selectedItem.name)
    : null;

  const selectedCTA = selectedItem?.type === 'action'
    ? obj.allCTAs.find(c => c.name === selectedItem.name)
    : null;

  

  const allViews = obj.shapeshifterMatrix ?? [];

  return (
    <div className="view-inspector">
      {/* Breadcrumb Bar */}
      <div className="view-breadcrumb-bar">
        <div className="view-breadcrumb">
          <a href={`/objects/${systemSlug}/${obj.identity.slug}`}>
            {obj.identity.name} {obj.identity.qualifier}
          </a>
          <span className="view-breadcrumb-sep">{' / '}</span>
          <div ref={dropdownRef} className="view-breadcrumb-dropdown">
            <button
              type="button"
              className="view-breadcrumb-current"
              onClick={() => setDropdownOpen(o => !o)}
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
            >
              {view.context}{' '}
              <span className="view-breadcrumb-shape">({view.shape})</span>
              <i className="fa-solid fa-angle-down view-breadcrumb-chevron" aria-hidden="true" />
            </button>
            {dropdownOpen && (
              <div className="view-breadcrumb-menu" role="listbox">
                {allViews.map(v => (
                  <button
                    key={v.value}
                    type="button"
                    role="option"
                    aria-selected={v.value === view.value}
                    onClick={() => {
                      setDropdownOpen(false);
                      window.location.href = `/objects/${systemSlug}/${obj.identity.slug}/views/${v.value}`;
                    }}
                  >
                    {v.context}
                    <span className="view-breadcrumb-menu-shape">({v.shape})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="view-inspector-panels">
        {/* Left Panel — Inventory */}
        <aside className="inventory-panel">
          <div className="inventory-section">
            <div className="inventory-section-header">
              <span className="inventory-section-icon">
                <i className="fa-solid fa-table" aria-hidden="true" />
              </span>
              Attributes
            </div>
            <div className="inventory-section-items">
            {viewAttributes.map(attr => {
              const isSelected =
                selectedItem?.type === 'attribute' && selectedItem.name === attr.name;
              const visible = isAttrVisibleForRole(attr);
              const isRef = attr.isReference;
              const isContent = isRef || attr.dataType === 'String';
              return (
                <div key={attr.name} className="inventory-item-wrap">
                  <button
                    type="button"
                    className={`inventory-item${isSelected ? ' selected' : ''}${!visible ? ' locked' : ''}`}
                    onClick={() =>
                      setSelectedItem(
                        isSelected ? null : { type: 'attribute', name: attr.name }
                      )
                    }
                  >
                    {visible ? (
                      <i
                        className="fa-solid fa-circle inventory-icon"
                        style={{ color: isContent ? '#FFA200' : '#CF3A4E' }}
                        aria-hidden="true"
                      />
                    ) : (
                      <i className="fa-regular fa-circle inventory-icon inventory-icon-hollow" aria-hidden="true" />
                    )}
                      <span className="inventory-item-label">
                        {isRef && attr.referenceName ? (
                          <>
                            <span className="inventory-ref-name">{attr.referenceName}</span>
                            <i className="fa-solid fa-arrow-right inventory-arrow-icon" aria-hidden="true" />
                            {attr.name}
                          </>
                        ) : (
                          attr.name
                        )}
                      </span>
                      <span className="inventory-badge">{attr.dataType}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="inventory-section">
            <div className="inventory-section-header">
              <span className="inventory-section-icon">
                <i className="fa-solid fa-location-arrow" aria-hidden="true" />
              </span>
              Actions
            </div>
            <div className="inventory-section-items">
              {viewCTAs.map(cta => {
                const isSelected =
                  selectedItem?.type === 'action' && selectedItem.name === cta.name;
                const available = isActionAvailableForRole(cta);
                return (
                  <div key={cta.name} className="inventory-item-wrap">
                    <button
                      type="button"
                      className={`inventory-item${isSelected ? ' selected' : ''}${!available ? ' locked' : ''}`}
                      onClick={() =>
                        setSelectedItem(
                          isSelected ? null : { type: 'action', name: cta.name }
                        )
                      }
                    >
                      {available ? (
                        <i
                          className="fa-solid fa-circle inventory-icon"
                          style={{ color: '#398B26' }}
                          aria-hidden="true"
                        />
                      ) : (
                        <i className="fa-regular fa-circle inventory-icon inventory-icon-hollow" aria-hidden="true" />
                      )}
                      <span className="inventory-item-label">{cta.name}</span>
                      <span className="inventory-badge">
                        {PRIORITY_LABELS[cta.priority] ?? cta.priority}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="inventory-section">
            <div className="inventory-section-header">
              <span className="inventory-section-icon">
                <i className="fa-solid fa-rotate" aria-hidden="true" />
              </span>
              States
            </div>
            <div className="inventory-section-items">
              {lifecycleStates.map(state => (
                <div key={state.name} className="inventory-item-wrap">
                  <div className="inventory-item static">
                    <i
                      className="fa-solid fa-circle inventory-icon"
                      style={{ color: '#666' }}
                      aria-hidden="true"
                    />
                    <span className="inventory-item-label">{state.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Panel — Preview */}
        <div className="preview-panel">
          <div className="view-toolbar-controls">
            <div className="toolbar-segment toolbar-segment-icon">
              <button
                type="button"
                className={previewMode === 'preview' ? 'active' : ''}
                onClick={() => setPreviewMode('preview')}
                aria-label="Preview"
                title="Preview"
              >
                <i className="fa-solid fa-eye" aria-hidden="true" />
              </button>
              <button
                type="button"
                className={previewMode === 'outline' ? 'active' : ''}
                onClick={() => setPreviewMode('outline')}
                aria-label="Outline"
                title="Outline"
              >
                <i className="fa-solid fa-border-none" aria-hidden="true" />
              </button>
            </div>

            <div className="toolbar-segment toolbar-segment-flex">
              {ROLES.map(role => (
                <button
                  key={role}
                  type="button"
                  className={selectedRole === role ? 'active' : ''}
                  onClick={() => setSelectedRole(role)}
                >
                  <i className="fa-solid fa-user" aria-hidden="true" />
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>

            <div className="toolbar-segment toolbar-segment-icon-lg">
              <button
                type="button"
                className={displayMode === 'list' ? 'active' : ''}
                onClick={() => setDisplayMode('list')}
                aria-label="List"
                title="List"
              >
                <i className="fa-solid fa-list" aria-hidden="true" />
              </button>
              <button
                type="button"
                className={displayMode === 'grid' ? 'active' : ''}
                onClick={() => setDisplayMode('grid')}
                aria-label="Grid"
                title="Grid"
              >
                <i className="fa-solid fa-table-cells" aria-hidden="true" />
              </button>
              <button
                type="button"
                className={displayMode === 'table' ? 'active' : ''}
                onClick={() => setDisplayMode('table')}
                aria-label="Table"
                title="Table"
              >
                <i className="fa-solid fa-table-list" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="preview-panel-content">
            {previewMode === 'preview' ? (
              (() => {
                const CustomPreview = getPreviewRenderer(obj.identity.slug, view.value);
                const isActionAvailableForPreview = (cta: ObjectCTA): boolean => {
                  const keys = ctaRoleOverrides[cta.name] ?? cta.roleKeys ?? [];
                  if (keys.length === 0) return true;
                  return keys.includes(selectedRole);
                };
                if (CustomPreview) {
                  return (
                    <CustomPreview
                      selectedItem={selectedItem}
                      onSelectItem={setSelectedItem}
                      selectedRole={selectedRole}
                      viewCTAs={viewCTAs}
                      viewAttributes={viewAttributes}
                      isActionAvailable={isActionAvailableForPreview}
                      lifecycleStates={lifecycleStates}
                      displayMode={displayMode}
                    />
                  );
                }
                return (
                  <PreviewContent
                    obj={obj}
                    view={view}
                    viewAttributes={viewAttributes}
                    viewCTAs={viewCTAs}
                    displayMode={displayMode}
                    selectedItem={selectedItem}
                    selectedRole={selectedRole}
                    ctaRoleOverrides={ctaRoleOverrides}
                    onSelectItem={setSelectedItem}
                  />
                );
              })()
            ) : (
              <OutlineContent view={view} obj={obj} />
            )}
          </div>
        </div>

        {/* Right Panel — Detail */}
        <aside className="detail-panel">
          {selectedAttr && (
            <AttributeDetail
              key={selectedAttr.name}
              attr={selectedAttr}
              objectSlug={obj.identity.slug}
              isPending={isPending}
              startTransition={startTransition}
            />
          )}
          {selectedCTA && (
            <ActionDetail
              key={selectedCTA.name}
              cta={selectedCTA}
              objectSlug={obj.identity.slug}
              selectedRole={selectedRole}
              ctaRoleOverrides={ctaRoleOverrides}
              onToggleRole={(ctaName, newKeys) => {
                setCtaRoleOverrides(prev => ({ ...prev, [ctaName]: newKeys }));
              }}
              isPending={isPending}
              startTransition={startTransition}
            />
          )}
          {!selectedAttr && !selectedCTA && (
            <div className="detail-empty">
              <i className="fa-solid fa-hand-pointer" aria-hidden="true" />
              <p>Select an attribute or action to view its details.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

interface PreviewSlots {
  avatarAttr: ObjectAttribute | null;
  primaryAttr: ObjectAttribute | null;
  secondaryAttrs: ObjectAttribute[];
}

const AVATAR_PATTERNS = /avatar|photo|image|picture|thumbnail/i;

function buildPreviewSlots(attrs: ObjectAttribute[]): PreviewSlots {
  let avatarAttr: ObjectAttribute | null = null;
  let primaryAttr: ObjectAttribute | null = null;
  const secondaryAttrs: ObjectAttribute[] = [];

  for (const attr of attrs) {
    if (!avatarAttr && (attr.dataType === 'Image' || attr.dataType === 'URL' || AVATAR_PATTERNS.test(attr.name))) {
      avatarAttr = attr;
    } else if (!primaryAttr && attr.dataType === 'String' && !attr.isReference) {
      primaryAttr = attr;
    } else {
      secondaryAttrs.push(attr);
    }
  }
  return { avatarAttr, primaryAttr, secondaryAttrs };
}

interface PreviewRow {
  name: string;
  initials: string;
  color: string;
  grade: string;
  school: string;
  state: string;
}

const AVATAR_COLORS = ['#2B87FF', '#398B26', '#ae74f0', '#fd4353', '#FF8C00', '#20B2AA'];

function buildPreviewRows(slug: string, states: LifecycleState[]): PreviewRow[] {
  const active = states[0]?.name ?? 'Active';
  const inactive = states[1]?.name ?? 'Inactive';
  const terminal = states[2]?.name ?? 'Transferred';

  switch (slug) {
    case 'student': {
      const list = getHighlightedStudents().slice(0, 4);
      return list.map((s, i) => ({
        name: s.name,
        initials: s.initials,
        color: AVATAR_COLORS[i % AVATAR_COLORS.length],
        grade: `Grade ${s.grade}`,
        school: s.school,
        state: i === list.length - 1 ? terminal : active,
      }));
    }
    case 'teacher': {
      const list = getAllTeachers().slice(0, 4);
      return list.map((t, i) => ({
        name: t.name,
        initials: t.initials,
        color: AVATAR_COLORS[i % AVATAR_COLORS.length],
        grade: t.gradeBand,
        school: t.school,
        state: i === list.length - 1 ? inactive : active,
      }));
    }
    case 'class': {
      const list = getAllClasses().slice(0, 4);
      return list.map((c, i) => ({
        name: c.name,
        initials: c.subject.slice(0, 3).toUpperCase(),
        color: AVATAR_COLORS[i % AVATAR_COLORS.length],
        grade: `Grade ${c.grade}`,
        school: c.school,
        state: i === list.length - 1 ? terminal : active,
      }));
    }
    default: {
      return [
        { name: 'Amara Johnson', initials: 'AJ', color: AVATAR_COLORS[0], grade: '3rd Grade', school: 'Lincoln Elementary School', state: active },
        { name: 'Leo Vasquez', initials: 'LV', color: AVATAR_COLORS[1], grade: '3rd Grade', school: 'Lincoln Elementary School', state: active },
        { name: 'Priya Patel', initials: 'PP', color: AVATAR_COLORS[2], grade: '4th Grade', school: 'Washington Middle School', state: active },
        { name: 'Marcus Williams', initials: 'MW', color: AVATAR_COLORS[3], grade: '4th Grade', school: 'Lincoln Elementary School', state: terminal },
      ];
    }
  }
}

const MOCK_VALUES: Record<string, string> = {
  'Grade Level': '3rd Grade',
  'Enrollment Status': 'Active',
  'Reading Level': '520L',
  'Math Level': '480',
  'Reading Proficiency': 'At/Above',
  'Math Proficiency': 'On Watch',
  'Number of Assignments': '7',
};

function mockValue(attr: ObjectAttribute, row: PreviewRow): string {
  if (MOCK_VALUES[attr.name]) return MOCK_VALUES[attr.name];
  if (attr.isReference) return row.school;
  if (attr.dataType === 'Enum') return row.state;
  if (attr.dataType === 'Number') return '82';
  if (attr.dataType === 'Date') return '2024-09-01';
  return '\u2014';
}

function PreviewContent({
  obj,
  view,
  viewAttributes,
  viewCTAs,
  displayMode,
  selectedItem,
  selectedRole,
  ctaRoleOverrides,
  onSelectItem,
}: {
  obj: ObjectDefinition;
  view: ShapeshifterEntry;
  viewAttributes: ObjectAttribute[];
  viewCTAs: ObjectCTA[];
  displayMode: string;
  selectedItem: SelectedItem;
  selectedRole: string;
  ctaRoleOverrides: Record<string, string[]>;
  onSelectItem: (item: SelectedItem) => void;
}) {
  const states = obj.lifecycle.states;
  const { avatarAttr, primaryAttr, secondaryAttrs } = buildPreviewSlots(viewAttributes);

  const mockStudents = buildPreviewRows(obj.identity.slug, states);

  const isAttrSelected = (attr: ObjectAttribute) =>
    selectedItem?.type === 'attribute' && selectedItem.name === attr.name;

  const isCtaSelected = (cta: ObjectCTA) =>
    selectedItem?.type === 'action' && selectedItem.name === cta.name;

  const toggleAttr = (attr: ObjectAttribute) => {
    onSelectItem(isAttrSelected(attr) ? null : { type: 'attribute', name: attr.name });
  };

  const toggleCta = (cta: ObjectCTA) => {
    onSelectItem(isCtaSelected(cta) ? null : { type: 'action', name: cta.name });
  };

  const isActionAvailable = (cta: ObjectCTA): boolean => {
    const keys = ctaRoleOverrides[cta.name] ?? cta.roleKeys ?? [];
    if (keys.length === 0) return true;
    return keys.includes(selectedRole);
  };

  const containerClass =
    displayMode === 'grid'
      ? 'preview-grid'
      : displayMode === 'table'
        ? 'preview-table'
        : 'preview-list';

  return (
    <div className={containerClass}>
      {mockStudents.map((student, i) => {
        const isActive = student.state === (states[0]?.name ?? 'Active');
        const isInactive = student.state === (states[1]?.name ?? 'Inactive');
        const isTerminal = !isActive && !isInactive;

        return (
          <div key={i} className="preview-row">
            <div className={`preview-row-identity${!isActive ? ' dimmed' : ''}`}>
              <div
                className={`preview-row-avatar${avatarAttr && isAttrSelected(avatarAttr) ? ' selected' : ''}`}
                style={{ backgroundColor: student.color }}
                onClick={avatarAttr ? () => toggleAttr(avatarAttr) : undefined}
                role={avatarAttr ? 'button' : undefined}
                title={avatarAttr?.name}
              >
                <span>{student.initials}</span>
              </div>
              <div className="preview-row-info">
                <span
                  className={`preview-row-name${primaryAttr && isAttrSelected(primaryAttr) ? ' selected' : ''}`}
                  onClick={primaryAttr ? () => toggleAttr(primaryAttr) : undefined}
                  role={primaryAttr ? 'button' : undefined}
                  title={primaryAttr?.name}
                >
                  {student.name}
                </span>
                {secondaryAttrs.length > 0 && (
                  <div className="preview-row-meta">
                    {secondaryAttrs.map((attr, j) => (
                      <span key={attr.name} className="preview-attr-wrap">
                        {j > 0 && <span className="preview-row-sep"> &middot; </span>}
                        <span
                          className={`preview-attr-chip${isAttrSelected(attr) ? ' selected' : ''}`}
                          onClick={() => toggleAttr(attr)}
                          role="button"
                          title={attr.name}
                        >
                          {mockValue(attr, student)}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="preview-row-actions">
              {(isActive || isInactive) && viewCTAs
                .filter(cta => {
                  if (!isActionAvailable(cta)) return false;
                  if (isActive) return cta.priority === 'P';
                  return cta.priority === 'P' || cta.priority === 'T';
                })
                .map(cta => (
                  <span
                    key={cta.name}
                    className={`preview-cta${cta.priority === 'P' ? ' primary' : ' tertiary'}${isCtaSelected(cta) ? ' annotated' : ''}`}
                    onClick={() => toggleCta(cta)}
                    role="button"
                    title={cta.name}
                  >
                    {cta.name}
                  </span>
                ))}
              {isTerminal && (
                <span className="preview-status">{student.state}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OutlineContent({
  view,
  obj,
}: {
  view: ShapeshifterEntry;
  obj: ObjectDefinition;
}) {
  const slug = obj.identity.slug;
  const attrVars = view.visibleAttributes.map(name => {
    const attr = obj.allAttributes.find(a => a.name === name);
    const refPrefix = attr?.referenceName ? `{${attr.referenceName.toLowerCase()}.` : `{${slug}.`;
    const fieldName = name.replace(/\s+/g, '').replace(/^./, c => c.toLowerCase());
    return `${refPrefix}${fieldName}}`;
  });

  const primaryCTA = obj.allCTAs.find(
    c => view.availableCTAs.includes(c.name) && c.priority === 'P'
  );

  return (
    <div className="preview-outline">
      <div className="outline-card">
        <div className="outline-avatar">
          <span className="outline-var">{`{${slug[0]}N}`}</span>
        </div>
        <div className="outline-fields">
          {attrVars.map((v, i) => (
            <span key={i} className="outline-var">
              {v}
            </span>
          ))}
        </div>
        {primaryCTA && (
          <div className="outline-cta">
            <span className="preview-cta primary">{primaryCTA.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AttributeDetail({
  attr,
  objectSlug,
  isPending,
  startTransition,
}: {
  attr: ObjectAttribute;
  objectSlug: string;
  isPending: boolean;
  startTransition: (fn: () => void) => void;
}) {
  const [description, setDescription] = useState(attr.description);
  const [source, setSource] = useState(attr.source);
  const [dataType, setDataType] = useState(attr.dataType);

  const handleUpdate = () => {
    startTransition(async () => {
      await updateAttribute(objectSlug, attr.name, {
        description,
        source,
        dataType,
      });
    });
  };

  const isContent = attr.isReference || attr.dataType === 'String';

  return (
    <div className="detail-content">
      <div className="detail-header">
        <i
          className="fa-solid fa-circle inventory-icon"
          style={{ color: isContent ? '#FFA200' : '#CF3A4E' }}
          aria-hidden="true"
        />
        <span className="detail-title">{attr.name}</span>
        <button
          type="button"
          className="detail-update-btn"
          onClick={handleUpdate}
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Update'}
        </button>
      </div>

      <div className="detail-section">
        <label className="detail-field">
          <span className="detail-label">Description</span>
          <textarea
            className="detail-textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
      </div>

      <div className="detail-section">
        <label className="detail-field">
          <span className="detail-label">Source</span>
          <input
            type="text"
            className="detail-input"
            value={source}
            onChange={e => setSource(e.target.value)}
          />
        </label>
      </div>

      <div className="detail-section">
        <label className="detail-field">
          <span className="detail-label">Data type</span>
          <select
            className="detail-select"
            value={dataType}
            onChange={e => setDataType(e.target.value)}
          >
            {['String', 'Number', 'Boolean', 'Date', 'Enum'].map(
              t => (
                <option key={t} value={t}>{t}</option>
              )
            )}
          </select>
        </label>
        <DataTypeFields dataType={dataType} attr={attr} />
      </div>
    </div>
  );
}

const DATE_FORMAT_OPTIONS = [
  { value: 'short', label: 'Jan. 3, 2026' },
  { value: 'numeric', label: '01/03/2026' },
  { value: 'long', label: '3 January 2026' },
  { value: 'today', label: 'Today' },
];

function DataTypeFields({ dataType, attr }: { dataType: string; attr: ObjectAttribute }) {
  const [dateFormat, setDateFormat] = useState('short');
  const [enumOptions, setEnumOptions] = useState<string[]>(
    () => [...(attr.enumOptions ?? []), '']
  );

  switch (dataType) {
    case 'String':
      return (
        <label className="detail-field">
          <span className="detail-label">Example</span>
          <input type="text" className="detail-input" defaultValue={attr.example ?? ''} placeholder="e.g. Hermione Granger" />
        </label>
      );

    case 'Number':
      return (
        <label className="detail-field">
          <span className="detail-label">Example</span>
          <input type="text" className="detail-input" defaultValue={attr.example ?? ''} placeholder="e.g. 820" />
        </label>
      );

    case 'Boolean':
      return (
        <div className="detail-field">
          <div className="detail-bool-row">
            <label className="detail-bool-col">
              <span className="detail-label">True</span>
              <input type="text" className="detail-input" defaultValue="" placeholder="Enrolled" />
            </label>
            <label className="detail-bool-col">
              <span className="detail-label">False</span>
              <input type="text" className="detail-input" defaultValue="" placeholder="Not enrolled" />
            </label>
          </div>
        </div>
      );

    case 'Date':
      return (
        <>
          <label className="detail-field">
            <span className="detail-label">Example</span>
            <div className="detail-readonly">
              {DATE_FORMAT_OPTIONS.find(o => o.value === dateFormat)?.label}
            </div>
          </label>
          <div className="detail-field">
            <div className="detail-radio-group">
              {DATE_FORMAT_OPTIONS.map(opt => (
                <label key={opt.value} className="detail-radio-row">
                  <input
                    type="radio"
                    name="dateFormat"
                    className="detail-radio"
                    value={opt.value}
                    checked={dateFormat === opt.value}
                    onChange={() => setDateFormat(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </>
      );

    case 'Enum':
      return (
        <div className="detail-field">
          <span className="detail-label">Options</span>
          <div className="detail-enum-list">
            {enumOptions.map((opt, i) => (
              <input
                key={i}
                type="text"
                className="detail-input"
                value={opt}
                placeholder={`Option ${i + 1}`}
                onChange={e => {
                  const next = [...enumOptions];
                  next[i] = e.target.value;
                  if (i === enumOptions.length - 1 && e.target.value !== '') {
                    next.push('');
                  }
                  setEnumOptions(next);
                }}
              />
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

const ROLE_LABELS: Record<string, string> = {
  teacher: 'Teacher',
  admin: 'Administrator',
  student: 'Student',
};

type RoleStoryContent = { context: string; benefit: string };

const CTA_ROLE_STORIES: Record<string, Partial<Record<string, RoleStoryContent>>> = {
  'View Profile': {
    teacher: {
      context: 'I navigate to a student from my class roster',
      benefit: "I can see their reading level, math level, recent scores, and current assignments at a glance",
    },
    admin: {
      context: "I need to review a student's enrollment or demographic details",
      benefit: "I can verify their school placement, class assignments, and data accuracy",
    },
    student: {
      context: 'I want to check my own academic progress',
      benefit: 'I can see my current reading level, recent scores, and upcoming assignments',
    },
  },
  'Search / Filter': {
    teacher: {
      context: 'I have a large class roster and need to find specific students',
      benefit: 'I can quickly locate students by name, grade, or performance level without scrolling the full list',
    },
    admin: {
      context: 'I need to locate specific students across a school or district',
      benefit: 'I can find any student quickly using any combination of filters',
    },
  },
  'View Scores': {
    teacher: {
      context: 'I want to understand how a student is performing on assessments',
      benefit: 'I can identify growth trends, proficiency bands, and areas needing intervention',
    },
    admin: {
      context: "I need to review a student's assessment history for reporting",
      benefit: 'I can see all scores across Star, DnA, and other assessments for accurate reporting',
    },
    student: {
      context: "I want to see how I'm doing on my assessments",
      benefit: 'I can track my own growth and understand where I stand relative to grade-level expectations',
    },
  },
  'View Skill Proficiency': {
    teacher: {
      context: "I want to understand a student's mastery of specific skills",
      benefit: "I can target instruction at skills they're still developing and confirm mastery of skills they've passed",
    },
    admin: {
      context: 'I need to review skill-level data for curriculum planning',
      benefit: 'I can identify skill gaps at the student level to inform school-wide or district-wide decisions',
    },
    student: {
      context: "I want to know which skills I've mastered and which ones I'm still working on",
      benefit: 'I can focus my practice on the skills that will help me grow the most',
    },
  },
  'Enroll in Class': {
    admin: {
      context: 'a new student joins the school or changes their schedule',
      benefit: "they immediately appear on the teacher's roster and gain access to class assignments and assessments",
    },
  },
  'Remove from Class': {
    admin: {
      context: 'a student leaves a class or their schedule changes',
      benefit: 'the roster stays accurate and the student no longer receives class-level content',
    },
  },
  'Add to Student Group': {
    teacher: {
      context: 'I identify a student who needs targeted support or enrichment',
      benefit: 'I can assign them group-specific activities and track their progress as part of that group',
    },
  },
  'Export Data': {
    admin: {
      context: 'I need to share or archive student data outside the system',
      benefit: 'I can generate accurate records for compliance, state reporting, or external analysis',
    },
  },
  'Transfer (School)': {
    admin: {
      context: 'a student moves to a different school within the district',
      benefit: "their historical data follows them and they appear correctly in their new school's reports",
    },
  },
  'Deactivate': {
    admin: {
      context: 'a student leaves the school or district',
      benefit: 'they are removed from active rosters without losing their historical data, which remains available for reporting',
    },
  },
};

function generateUserStory(cta: ObjectCTA, role: string): string {
  const roleLabel = ROLE_LABELS[role] ?? role.charAt(0).toUpperCase() + role.slice(1);
  const content = CTA_ROLE_STORIES[cta.name]?.[role];
  if (content) {
    return `As a ${roleLabel}, when ${content.context}, I want to ${cta.name.toLowerCase()} so that ${content.benefit}.`;
  }
  const action = cta.crossObjectName
    ? `${cta.name.toLowerCase()} (${cta.crossObjectName})`
    : cta.name.toLowerCase();
  return `As a ${roleLabel}, I want to ${action} so that I can accomplish my goal.`;
}

function ActionDetail({
  cta,
  objectSlug: _objectSlug,
  selectedRole,
  ctaRoleOverrides,
  onToggleRole,
  isPending,
  startTransition: _startTransition,
}: {
  cta: ObjectCTA;
  objectSlug: string;
  selectedRole: string;
  ctaRoleOverrides: Record<string, string[]>;
  onToggleRole: (ctaName: string, newKeys: string[]) => void;
  isPending: boolean;
  startTransition: (fn: () => void) => void;
}) {
  const baseKeys = cta.roleKeys ?? [];
  const roleKeys = ctaRoleOverrides[cta.name] ?? baseKeys;

  const handleToggleRole = (role: string) => {
    const effectiveKeys = roleKeys.length === 0 ? [...ROLES] : [...roleKeys];
    const newKeys = effectiveKeys.includes(role)
      ? effectiveKeys.filter(r => r !== role)
      : [...effectiveKeys, role];
    onToggleRole(cta.name, newKeys);
  };

  return (
    <div className="detail-content">
      <div className="detail-header">
        <i
          className="fa-solid fa-circle inventory-icon"
          style={{ color: '#398B26' }}
          aria-hidden="true"
        />
        <span className="detail-title">{cta.name}</span>
        <button
          type="button"
          className="detail-update-btn"
          onClick={() => {}}
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Update'}
        </button>
      </div>

      <div className="detail-section">
        <label className="detail-field">
          <span className="detail-label">Description</span>
          <textarea
            className="detail-textarea"
            defaultValue={cta.description ?? ''}
          />
        </label>
      </div>

      {(roleKeys.length === 0 || roleKeys.includes(selectedRole)) && (
        <div className="detail-section">
          <label className="detail-field">
            <span className="detail-label">User Story</span>
            <textarea
              key={`${cta.name}-${selectedRole}`}
              className="detail-textarea"
              defaultValue={generateUserStory(cta, selectedRole)}
            />
          </label>
        </div>
      )}

      <div className="detail-section">
        <div className="detail-field">
          <span className="detail-label">Permissions</span>
          <div className="detail-permissions">
            {ROLES.map(role => (
              <label key={role} className="detail-permission-row">
                <input
                  type="checkbox"
                  className="detail-toggle"
                  checked={roleKeys.length === 0 || roleKeys.includes(role)}
                  onChange={() => handleToggleRole(role)}
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div className="detail-field">
          <span className="detail-label">Cross-object?</span>
          {cta.crossObjectSlug ? (
            <a href={`/objects/${cta.crossObjectSlug}`} className="attr-ref">
              {cta.crossObjectName}
            </a>
          ) : (
            <div className="detail-readonly-muted">None</div>
          )}
        </div>
      </div>
    </div>
  );
}
