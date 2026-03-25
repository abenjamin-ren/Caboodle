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
    href: s.href,
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
                  {s.href ? (
                    <a href={s.href} className={`roster-card-name${nameSelected ? ' selected' : ''}`}>{s.name}</a>
                  ) : (
                    <div className={`roster-card-name${nameSelected ? ' selected' : ''}`}>{s.name}</div>
                  )}
                  {active ? (
                    <div className="roster-card-meta">
                      <span className={gradeSelected ? 'selected' : ''}>{s.grade}</span>
                      <span className="roster-meta-dot" />
                      <span>{s.assignmentCount} Assignments</span>
                    </div>
                  ) : (
                    <div className={`roster-card-meta roster-card-meta--italic${enrollmentSelected ? ' selected' : ''}`}>{s.enrollmentStatus}</div>
                  )}
                </div>
              </div>

              {active && (
                <div className="roster-card-scores">
                  <div className={`roster-card-score-col${readingSelected ? ' selected' : ''}`}>
                    <span className="roster-card-score-value roster-card-score-value--reading">{s.readingLevel}</span>
                    <span className="roster-card-score-label">Reading</span>
                    <span className={`roster-card-score-band${rAlert ? ' roster-card-score-band--alert' : ''}`}>
                      {rAlert && (
                        <i className="fa-solid fa-circle-exclamation roster-alert-icon" aria-label="Needs attention" />
                      )}
                      {s.readingStatus}
                    </span>
                  </div>
                  <div className={`roster-card-score-col${mathSelected ? ' selected' : ''}`}>
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
    <div className="roster-list" role="list">
      {students.map((s, i) => {
        const active = isStudentActive(s);

        return (
          <div key={s.id ?? i} className={`roster-row${!active ? ' roster-row--inactive' : ''}`} role="listitem">
            <div className={`roster-identity${active ? '' : ' roster-identity--faded'}`}>
              <RosterRing
                readingPercent={s.readingPercent}
                mathPercent={s.mathPercent}
                inactive={!active}
              />
              <div className="roster-name-block">
                {s.href ? (
                  <a href={s.href} className={`roster-name${nameSelected ? ' selected' : ''}`}>{s.name}</a>
                ) : (
                  <span className={`roster-name${nameSelected ? ' selected' : ''}`}>{s.name}</span>
                )}
                {active ? (
                  <div className="roster-meta">
                    <span className={gradeSelected ? 'selected' : ''}>{s.grade}</span>
                    <span className="roster-meta-dot" />
                    <span>{s.assignmentCount} Assignments</span>
                  </div>
                ) : (
                  <div className={`roster-meta roster-meta--italic${enrollmentSelected ? ' selected' : ''}`}>{s.enrollmentStatus}</div>
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
                  href={s.href}
                />
                <RosterScoreColumn
                  subject="Math"
                  value={s.mathLevel}
                  band={s.mathStatus}
                  dotClass="roster-score-dot--math"
                  selected={mathSelected ?? false}
                  href={s.href}
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
