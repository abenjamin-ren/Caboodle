'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { PreviewInspectionProps, SelectedItem } from '@/lib/preview-types';
import { RosterRing } from '@/components/roster/RosterRing';
import { RosterScoreColumn } from '@/components/roster/RosterScoreColumn';
import { RosterOverflowMenu } from '@/components/roster/RosterOverflowMenu';
import type { RosterMenuItem } from '@/components/roster/RosterOverflowMenu';
import { getHighlightedStudents } from '@/lib/mock';
import type { MockStudent } from '@/lib/mock';

export interface RosterStudent {
  id?: string;
  name: string;
  href?: string;
  grade: string;
  readingLevel: string;
  readingStatus: string;
  readingPercent: number;
  mathLevel: string;
  mathStatus: string;
  mathPercent: number;
  assignmentCount: number;
  enrollmentStatus: string;
}

interface StudentRosterProps extends Partial<PreviewInspectionProps> {
  students?: RosterStudent[];
  menuItems?: RosterMenuItem[];
  embedded?: boolean;
}

const INACTIVE_STATUSES = new Set(['Transferred', 'Graduated', 'Inactive']);

const MENU_CTA_NAMES = new Set(['Add to Student Group', 'Enroll in Class', 'Remove from Class']);

function formatGrade(grade: string): string {
  const n = parseInt(grade, 10);
  if (isNaN(n)) return grade;
  const suffix = n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th';
  return `${n}${suffix} Grade`;
}

function toRosterStudent(s: MockStudent): RosterStudent {
  return {
    id: s.id,
    name: s.name,
    grade: formatGrade(s.grade),
    readingLevel: s.readingLevel ? `${s.readingLevel}L` : '—',
    readingStatus: s.readingStatus,
    readingPercent: s.readingPercent,
    mathLevel: s.mathLevel,
    mathStatus: s.mathStatus,
    mathPercent: s.mathPercent,
    assignmentCount: s.assignmentCount,
    enrollmentStatus: s.enrollmentStatus,
  };
}

const DEFAULT_STUDENTS: RosterStudent[] = getHighlightedStudents().map(toRosterStudent);

function needsAttention(band: string): boolean {
  return band !== 'At/Above';
}

export function StudentRosterPreview({
  selectedItem,
  lifecycleStates,
  viewCTAs,
  isActionAvailable,
  displayMode = 'list',
  students: externalStudents,
  menuItems: externalMenuItems,
  embedded = false,
}: StudentRosterProps) {
  const isInspector = selectedItem !== undefined;

  const isAttr = (name: string) =>
    selectedItem?.type === 'attribute' && selectedItem.name === name;
  const isCTA = (name: string) =>
    selectedItem?.type === 'action' && selectedItem.name === name;

  const nameSelected = isInspector && (isAttr('Full Name') || isCTA('View Profile'));
  const gradeSelected = isInspector && isAttr('Grade Level');
  const enrollmentSelected = isInspector && isAttr('Enrollment Status');
  const readingSelected = isInspector && (isAttr('Reading Level') || isCTA('View Scores'));
  const mathSelected = isInspector && (isAttr('Math Level') || isCTA('View Scores'));
  const menuSelected = isInspector && selectedItem?.type === 'action' && MENU_CTA_NAMES.has(selectedItem.name);

  const students = useMemo(() => {
    if (externalStudents) return externalStudents;
    if (!lifecycleStates?.length) return DEFAULT_STUDENTS;
    return DEFAULT_STUDENTS.map((s, i) => {
      if (i === DEFAULT_STUDENTS.length - 1) return { ...s, enrollmentStatus: lifecycleStates[2]?.name ?? 'Transferred' };
      return { ...s, enrollmentStatus: lifecycleStates[0]?.name ?? 'Active' };
    });
  }, [externalStudents, lifecycleStates]);

  const activeState = lifecycleStates?.[0]?.name ?? 'Active';
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  type SortKey = 'name' | 'grade' | 'assignments' | 'reading' | 'math';
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuClose = useCallback(() => setOpenMenuIndex(null), []);

  const menuCTAs = useMemo(() => {
    if (externalMenuItems) return externalMenuItems;
    if (!viewCTAs || !isActionAvailable) return [];
    return viewCTAs
      .filter(cta => isActionAvailable(cta) && cta.priority !== 'P' && cta.priority !== 'S')
      .map(cta => ({ label: cta.name }));
  }, [externalMenuItems, viewCTAs, isActionAvailable]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuIndex(null);
      }
    }
    if (openMenuIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuIndex]);

  const isStudentActive = (s: RosterStudent) => {
    if (INACTIVE_STATUSES.has(s.enrollmentStatus)) return false;
    if (lifecycleStates?.length) return s.enrollmentStatus === activeState;
    return true;
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedStudents = useMemo(() => {
    if (!sortKey) return students;
    return [...students].sort((a, b) => {
      let cmp: number;
      switch (sortKey) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'grade':
          cmp = a.grade.localeCompare(b.grade, undefined, { numeric: true });
          break;
        case 'assignments':
          cmp = a.assignmentCount - b.assignmentCount;
          break;
        case 'reading':
          cmp = a.readingLevel.localeCompare(b.readingLevel, undefined, { numeric: true });
          break;
        case 'math':
          cmp = a.mathLevel.localeCompare(b.mathLevel, undefined, { numeric: true });
          break;
        default:
          cmp = 0;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [students, sortKey, sortDir]);

  const isCTAAvailable = useCallback((name: string): boolean => {
    if (!viewCTAs || !isActionAvailable) return true;
    const cta = viewCTAs.find(c => c.name === name);
    return cta ? isActionAvailable(cta) : false;
  }, [viewCTAs, isActionAvailable]);

  const viewProfileAvailable = isCTAAvailable('View Profile');
  const viewScoresAvailable = isCTAAvailable('View Scores');

  const tableMenuItems = useMemo(() => {
    if (menuCTAs.length > 0) return menuCTAs;
    if (!viewCTAs || !isActionAvailable) {
      return [
        { label: 'Add to Student Group' },
        { label: 'Enroll in Class' },
        { label: 'Remove from Class' },
      ];
    }
    return [];
  }, [menuCTAs, viewCTAs, isActionAvailable]);

  function renderSortHeader(key: SortKey, label: string, extraClass?: string) {
    const isActive = sortKey === key;
    return (
      <th scope="col" className={`roster-th${isActive ? ' roster-th--active' : ''}${extraClass ? ` ${extraClass}` : ''}`}>
        <button
          type="button"
          className="roster-th-sort"
          aria-label={`Sort by ${label.toLowerCase()}, ${isActive ? sortDir + 'ending' : 'unsorted'}`}
          onClick={() => handleSort(key)}
        >
          {label}
          <i
            className={`fa-solid ${isActive && sortDir === 'desc' ? 'fa-arrow-down' : 'fa-arrow-up'} roster-sort-icon${isActive ? '' : ' roster-sort-icon--idle'}`}
            aria-hidden="true"
          />
        </button>
      </th>
    );
  }

  if (displayMode === 'table') {
    return (
      <div className="roster-table-wrap">
        <table className="roster-table">
          <caption className="sr-only">Student roster</caption>
          <thead>
            <tr>
              {renderSortHeader('name', 'Name')}
              {renderSortHeader('grade', 'Grade')}
              {renderSortHeader('assignments', 'Assignments', 'roster-th--center')}
              {renderSortHeader('reading', 'Reading score')}
              {renderSortHeader('math', 'Math score')}
              <th scope="col" className="roster-th roster-th--actions"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((s, i) => {
              const active = isStudentActive(s);
              const rAlert = needsAttention(s.readingStatus);
              const mAlert = needsAttention(s.mathStatus);
              const profileHref = s.href ?? '#';
              const scoresHref = s.href ? `${s.href}/scores` : '#';

              const readingPill = (
                <>
                  <span className="roster-score-pill-dot roster-score-pill-dot--reading" />
                  <span className="roster-score-pill-value">{s.readingLevel}</span>
                  <span className={`roster-score-pill-band${rAlert ? ' roster-score-pill-band--alert' : ''}`}>{s.readingStatus}</span>
                </>
              );

              const mathPill = (
                <>
                  <span className="roster-score-pill-dot roster-score-pill-dot--math" />
                  <span className="roster-score-pill-value">{s.mathLevel}</span>
                  <span className={`roster-score-pill-band${mAlert ? ' roster-score-pill-band--alert' : ''}`}>{s.mathStatus}</span>
                </>
              );

              return (
                <tr key={s.id ?? i} className={`roster-table-row${!active ? ' roster-table-row--inactive' : ''}`}>
                  <td className="roster-td">
                    {viewProfileAvailable ? (
                      <a href={profileHref} className={`roster-td-name${nameSelected ? ' highlighted' : ''}`}>{s.name}</a>
                    ) : (
                      <span className={`roster-td-name roster-td-name--plain${nameSelected ? ' highlighted' : ''}`}>{s.name}</span>
                    )}
                  </td>
                  <td className={`roster-td${gradeSelected ? ' highlighted' : ''}`}>{active ? s.grade : ''}</td>
                  <td className="roster-td roster-td--center">{active ? s.assignmentCount : ''}</td>
                  <td className="roster-td">
                    {active && viewScoresAvailable && (
                      <a href={scoresHref} className={`roster-score-pill roster-score-pill--reading${readingSelected ? ' highlighted' : ''}`}>
                        {readingPill}
                      </a>
                    )}
                    {active && !viewScoresAvailable && (
                      <span className={`roster-score-pill roster-score-pill--reading${readingSelected ? ' highlighted' : ''}`}>
                        {readingPill}
                      </span>
                    )}
                    {!active && <span className="obj-list-meta--italic">{s.enrollmentStatus}</span>}
                  </td>
                  <td className="roster-td">
                    {active && viewScoresAvailable && (
                      <a href={scoresHref} className={`roster-score-pill roster-score-pill--math${mathSelected ? ' highlighted' : ''}`}>
                        {mathPill}
                      </a>
                    )}
                    {active && !viewScoresAvailable && (
                      <span className={`roster-score-pill roster-score-pill--math${mathSelected ? ' highlighted' : ''}`}>
                        {mathPill}
                      </span>
                    )}
                  </td>
                  <td className="roster-td">
                    {tableMenuItems.length > 0 && (
                      <div className="roster-menu-zone" ref={openMenuIndex === i ? menuRef : null} style={{ padding: 0 }}>
                        <RosterOverflowMenu
                          items={tableMenuItems}
                          open={openMenuIndex === i}
                          onToggle={() => setOpenMenuIndex(openMenuIndex === i ? null : i)}
                          onClose={handleMenuClose}
                          selected={menuSelected ?? false}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  if (displayMode === 'grid') {
    return (
      <div className="roster-grid">
        {students.map((s, i) => {
          const active = isStudentActive(s);
          const rAlert = needsAttention(s.readingStatus);
          const mAlert = needsAttention(s.mathStatus);

          return (
            <div key={s.id ?? i} className={`roster-card${active ? '' : ' roster-card--faded'}`}>
              <div className="roster-card-header">
                {menuCTAs.length > 0 && (
                  <div className="roster-card-menu-zone" ref={openMenuIndex === i ? menuRef : null}>
                    <RosterOverflowMenu
                      items={menuCTAs}
                      open={openMenuIndex === i}
                      onToggle={() => setOpenMenuIndex(openMenuIndex === i ? null : i)}
                      onClose={handleMenuClose}
                      selected={menuSelected ?? false}
                    />
                  </div>
                )}

                <RosterRing
                  readingPercent={s.readingPercent}
                  mathPercent={s.mathPercent}
                  inactive={!active}
                />
                <div className="roster-card-name-block">
                  {s.href && !embedded ? (
                    <a href={s.href} className={`roster-card-name${nameSelected ? ' highlighted' : ''}`}>{s.name}</a>
                  ) : (
                    <div className={`roster-card-name${nameSelected ? ' highlighted' : ''}`}>{s.name}</div>
                  )}
                  {active ? (
                    <div className="roster-card-meta">
                      <span className={gradeSelected ? 'highlighted' : ''}>{s.grade}</span>
                      <span className="obj-list-meta-dot" />
                      <span>{s.assignmentCount} Assignments</span>
                    </div>
                  ) : (
                    <div className={`roster-card-meta roster-card-meta--italic${enrollmentSelected ? ' highlighted' : ''}`}>{s.enrollmentStatus}</div>
                  )}
                </div>
              </div>

              {active && (
                <div className="roster-card-scores">
                  <div className={`roster-card-score-col${readingSelected ? ' highlighted' : ''}`}>
                    <span className="roster-card-score-value roster-card-score-value--reading">{s.readingLevel}</span>
                    <span className="roster-card-score-label">Reading</span>
                    <span className={`roster-card-score-band${rAlert ? ' roster-card-score-band--alert' : ''}`}>
                      {rAlert && (
                        <i className="fa-solid fa-circle-exclamation roster-alert-icon" aria-label="Needs attention" />
                      )}
                      {s.readingStatus}
                    </span>
                  </div>
                  <div className={`roster-card-score-col${mathSelected ? ' highlighted' : ''}`}>
                    <span className="roster-card-score-value roster-card-score-value--math">{s.mathLevel}</span>
                    <span className="roster-card-score-label">Math</span>
                    <span className={`roster-card-score-band${mAlert ? ' roster-card-score-band--alert' : ''}`}>
                      {mAlert && (
                        <i className="fa-solid fa-circle-exclamation roster-alert-icon" aria-label="Needs attention" />
                      )}
                      {s.mathStatus}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="obj-list" role="list">
      {students.map((s, i) => {
        const active = isStudentActive(s);

        return (
          <div key={s.id ?? i} className={`obj-list-row roster-row${!active ? ' roster-row--inactive' : ''}`} role="listitem">
            <div className={`roster-identity${active ? '' : ' roster-identity--faded'}`}>
              <RosterRing
                readingPercent={s.readingPercent}
                mathPercent={s.mathPercent}
                inactive={!active}
              />
              <div className="obj-list-name-block">
                {s.href && !embedded ? (
                  <a href={s.href} className={`obj-list-name${nameSelected ? ' highlighted' : ''}`}>{s.name}</a>
                ) : (
                  <span className={`obj-list-name${nameSelected ? ' highlighted' : ''}`}>{s.name}</span>
                )}
                {active ? (
                  <div className="obj-list-meta">
                    <span className={gradeSelected ? 'highlighted' : ''}>{s.grade}</span>
                    <span className="obj-list-meta-dot" />
                    <span>{s.assignmentCount} Assignments</span>
                  </div>
                ) : (
                  <div className={`obj-list-meta obj-list-meta--italic${enrollmentSelected ? ' highlighted' : ''}`}>{s.enrollmentStatus}</div>
                )}
              </div>
            </div>

            {active && (
              <div className="roster-scores">
                <RosterScoreColumn
                  subject="Reading"
                  value={s.readingLevel}
                  band={s.readingStatus}
                  dotClass="roster-score-dot--reading"
                  selected={readingSelected ?? false}
                  href={embedded ? undefined : s.href}
                />
                <RosterScoreColumn
                  subject="Math"
                  value={s.mathLevel}
                  band={s.mathStatus}
                  dotClass="roster-score-dot--math"
                  selected={mathSelected ?? false}
                  href={embedded ? undefined : s.href}
                />
              </div>
            )}

            {menuCTAs.length > 0 && (
              <div className="roster-menu-zone" ref={openMenuIndex === i ? menuRef : null}>
                <RosterOverflowMenu
                  items={menuCTAs}
                  open={openMenuIndex === i}
                  onToggle={() => setOpenMenuIndex(openMenuIndex === i ? null : i)}
                  onClose={handleMenuClose}
                  selected={menuSelected ?? false}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
