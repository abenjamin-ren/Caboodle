'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ObjectTable, type ObjectTableColumn } from '@/components/ui/ObjectTable';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { DeleteConfirmOverlay } from '@/components/ui/DeleteConfirmOverlay';
import type { PreviewInspectionProps } from '@/lib/preview-types';

type AssignmentStatus = 'completed' | 'in-progress' | 'assigned' | 'overdue';
type AssignmentType = 'Early Reading Practice' | 'Knowledge Check' | 'Math Challenge' | 'Reading Activity' | 'Skills Practice';

interface MockAssignment {
  id: string;
  name: string;
  type: AssignmentType;
  assignedDate: string;
  status: AssignmentStatus;
  completionCount: string;
  notStarted: number;
  inProgress: number;
  complete: number;
  createdBy: string;
}

const ASSIGNMENT_TYPE_ICON: Record<AssignmentType, string> = {
  'Early Reading Practice': 'fa-solid fa-book',
  'Knowledge Check': 'fa-solid fa-lightbulb',
  'Math Challenge': 'fa-solid fa-hashtag',
  'Reading Activity': 'fa-solid fa-book-open',
  'Skills Practice': 'fa-solid fa-pen',
};

function AssignmentIcon({ type, percent }: { type: AssignmentType; percent: number }) {
  return (
    <span className="assign-list-icon" aria-hidden="true">
      <svg className="assign-list-ring" viewBox="0 0 40 40" aria-hidden="true">
        <ProgressRing
          percent={percent}
          radius={18}
          color="var(--color-status-active)"
          cx={20}
          cy={20}
          className="assign-list-ring-arc"
        />
      </svg>
      <i className={ASSIGNMENT_TYPE_ICON[type]} />
    </span>
  );
}

const STATUS_LABELS: Record<AssignmentStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  assigned: 'Assigned',
  overdue: 'Overdue',
};

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateShort(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function AssignmentStatusBadge({ status }: { status: AssignmentStatus }) {
  return (
    <span className={`assign-status-badge assign-status-badge--${status}`}>
      <span className="assign-status-dot" aria-hidden="true" />
      <span className="assign-status-label">{STATUS_LABELS[status]}</span>
    </span>
  );
}

const MOCK_ASSIGNMENTS: MockAssignment[] = [
  {
    id: '1',
    name: 'Algebra: Basic Quiz',
    type: 'Knowledge Check',
    assignedDate: '2026-02-25',
    status: 'completed',
    completionCount: '25/25',
    notStarted: 0,
    inProgress: 0,
    complete: 25,
    createdBy: 'Me (Jane Doe)',
  },
  {
    id: '2',
    name: 'Fractions Practice',
    type: 'Skills Practice',
    assignedDate: '2026-02-20',
    status: 'in-progress',
    completionCount: '11/16',
    notStarted: 2,
    inProgress: 3,
    complete: 11,
    createdBy: 'Me (Jane Doe)',
  },
  {
    id: '3',
    name: 'Long Division Practice',
    type: 'Math Challenge',
    assignedDate: '2026-02-02',
    status: 'assigned',
    completionCount: '0/16',
    notStarted: 16,
    inProgress: 0,
    complete: 0,
    createdBy: 'Me (Jane Doe)',
  },
  {
    id: '4',
    name: 'Multiplication Fluency',
    type: 'Skills Practice',
    assignedDate: '2026-02-15',
    status: 'in-progress',
    completionCount: '9/25',
    notStarted: 8,
    inProgress: 8,
    complete: 9,
    createdBy: 'Fredrick Crane',
  },
  {
    id: '5',
    name: "Charlotte's Web Ch. 4–6",
    type: 'Reading Activity',
    assignedDate: '2026-03-10',
    status: 'overdue',
    completionCount: '8/16',
    notStarted: 3,
    inProgress: 5,
    complete: 8,
    createdBy: 'Me (Jane Doe)',
  },
  {
    id: '6',
    name: 'Short Vowel Blending',
    type: 'Early Reading Practice',
    assignedDate: '2026-03-14',
    status: 'assigned',
    completionCount: '0/25',
    notStarted: 25,
    inProgress: 0,
    complete: 0,
    createdBy: 'Me (Jane Doe)',
  },
];

export function ClassAssignmentsPreview({
  selectedItem,
  selectedRole,
  isActionAvailable,
  viewCTAs,
  displayMode = 'table',
}: Partial<PreviewInspectionProps>) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [exitingId, setExitingId] = useState<string | null>(null);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  const isAttr = (name: string) =>
    selectedItem?.type === 'attribute' && selectedItem.name === name;
  const isCTA = (name: string) =>
    selectedItem?.type === 'action' && selectedItem.name === name;

  const nameSelected = isAttr('Assignment Name') || isCTA('View Assignment Report');
  const typeSelected = isAttr('Assignment Type');
  const assignedDateSelected = isAttr('Assigned Date');
  const statusSelected = isAttr('Status');
  const completionSelected = isAttr('Completion Count');
  const createdBySelected = isAttr('Created By');
  const deleteSelected = isCTA('Delete');

  const canDelete = useMemo(() => {
    if (!viewCTAs || !isActionAvailable) return true;
    const cta = viewCTAs.find(c => c.name === 'Delete');
    return cta ? isActionAvailable(cta) : false;
  }, [viewCTAs, isActionAvailable]);

  const visibleRows = useMemo(
    () => MOCK_ASSIGNMENTS.filter(r => !deletedIds.has(r.id)),
    [deletedIds],
  );

  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (exitTimerRef.current) clearTimeout(exitTimerRef.current); };
  }, []);

  const handleDeleteConfirm = useCallback((id: string) => {
    setDeletedIds(prev => new Set(prev).add(id));
    setDeletingId(null);
    setExitingId(null);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setExitingId(deletingId);
    exitTimerRef.current = setTimeout(() => {
      setDeletingId(null);
      setExitingId(null);
    }, 280);
  }, [deletingId]);

  const canDeleteRow = useCallback((r: MockAssignment) => {
    if (!canDelete) return false;
    const isAdmin = selectedRole === 'admin';
    const allNotStarted = r.inProgress === 0 && r.complete === 0;
    return isAdmin || allNotStarted;
  }, [canDelete, selectedRole]);

  const renderDeleteButton = useCallback((r: MockAssignment) => {
    const isConfirming = r.id === deletingId || r.id === exitingId;

    if (isConfirming) {
      return (
        <button
          type="button"
          className="obj-icon-btn"
          aria-label="Cancel delete"
          onClick={handleDeleteCancel}
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      );
    }

    if (canDeleteRow(r)) {
      return (
        <button
          type="button"
          className={`obj-icon-btn${deleteSelected ? ' highlighted' : ''}`}
          aria-label={`Delete ${r.name}`}
          onClick={() => setDeletingId(r.id)}
        >
          <i className="fa-regular fa-trash-can" aria-hidden="true" />
        </button>
      );
    }

    return <div className="obj-icon-btn-placeholder" aria-hidden="true" />;
  }, [deletingId, exitingId, deleteSelected, canDeleteRow, handleDeleteCancel]);

  const renderRowOverlay = useCallback((r: MockAssignment) => {
    const isConfirming = r.id === deletingId || r.id === exitingId;
    if (!isConfirming) return null;
    return (
      <DeleteConfirmOverlay
        itemName={r.name}
        itemType="assignment"
        isExiting={r.id === exitingId}
        onConfirm={() => handleDeleteConfirm(r.id)}
        onCancel={handleDeleteCancel}
      />
    );
  }, [deletingId, exitingId, handleDeleteConfirm, handleDeleteCancel]);

  /* ---------- List shape ---------- */

  if (displayMode === 'list') {
    return (
      <div className="obj-list" role="list">
        {visibleRows.map(r => {
          const isConfirming = r.id === deletingId || r.id === exitingId;
          const totalStudents = r.notStarted + r.inProgress + r.complete;

          return (
            <div
              key={r.id}
              className={`obj-list-row${isConfirming ? ' obj-table-row--confirming' : ''}`}
              role="listitem"
            >
              {isConfirming && (
                <DeleteConfirmOverlay
                  itemName={r.name}
                  itemType="assignment"
                  isExiting={r.id === exitingId}
                  onConfirm={() => handleDeleteConfirm(r.id)}
                  onCancel={handleDeleteCancel}
                />
              )}

              <div className="assign-list-identity">
                <AssignmentIcon
                  type={r.type}
                  percent={totalStudents > 0 ? (r.complete / totalStudents) * 100 : 0}
                />
                <div className="obj-list-name-block">
                  <div className="obj-list-name-line">
                    <a
                      href="#"
                      className={`obj-list-name${nameSelected ? ' highlighted' : ''}`}
                      aria-label={`View ${r.name}`}
                    >
                      {r.name}
                    </a>
                    <span className="obj-list-meta-dot" />
                    <span className={`assign-list-student-count${completionSelected ? ' highlighted' : ''}`}>
                      {totalStudents} Students
                    </span>
                  </div>
                  <div className="obj-list-meta">
                    <span className={typeSelected ? 'highlighted' : ''}>{r.type}</span>
                    <span className="obj-list-meta-dot" />
                    <span className={assignedDateSelected || createdBySelected ? 'highlighted' : ''}>
                      {`Assigned by ${r.createdBy} on ${formatDateShort(r.assignedDate)}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`assign-list-stats${completionSelected ? ' highlighted' : ''}`}>
                <div className="assign-list-stat">
                  <span className="assign-list-stat-value">{r.notStarted}</span>
                  <span className="assign-list-stat-label">Not started</span>
                </div>
                <div className="assign-list-stat">
                  <span className="assign-list-stat-value">{r.inProgress}</span>
                  <span className="assign-list-stat-label">In progress</span>
                </div>
                <div className="assign-list-stat assign-list-stat--complete">
                  <span className="assign-list-stat-value">{r.complete}</span>
                  <span className="assign-list-stat-label">Complete</span>
                </div>
              </div>

              <div className="assign-list-actions">
                {renderDeleteButton(r)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  /* ---------- Table shape (default) ---------- */

  const columns: ObjectTableColumn<MockAssignment>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      getSortValue: r => r.name,
      render: r => (
        <a
          href="#"
          className={`obj-td-name${nameSelected ? ' highlighted' : ''}`}
          aria-label={`View ${r.name}`}
        >
          {r.name}
        </a>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      getSortValue: r => r.type,
      render: r => (
        <span className={typeSelected ? 'highlighted' : ''}>{r.type}</span>
      ),
    },
    {
      key: 'assignedDate',
      label: 'Assigned',
      sortable: true,
      getSortValue: r => r.assignedDate,
      render: r => (
        <span className={assignedDateSelected ? 'highlighted' : ''}>{formatDate(r.assignedDate)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      getSortValue: r => r.status,
      render: r => (
        <span className="assign-status-cell">
          <span className={statusSelected ? 'highlighted' : ''}>
            <AssignmentStatusBadge status={r.status} />
          </span>
          <span className={completionSelected ? 'highlighted' : ''}>
            <span className="assign-status-count">{r.completionCount}</span>
          </span>
        </span>
      ),
    },
    {
      key: 'createdBy',
      label: 'Created by',
      sortable: true,
      getSortValue: r => r.createdBy,
      render: r => (
        <span className={createdBySelected ? 'highlighted' : ''}>{r.createdBy}</span>
      ),
    },
    {
      key: 'actions',
      label: '',
      width: '61px',
      render: r => renderDeleteButton(r),
    },
  ];

  const rowClassName = (row: MockAssignment) => (row.id === deletingId || row.id === exitingId)
    ? 'obj-table-row--confirming'
    : '';

  return (
    <ObjectTable
      columns={columns}
      rows={visibleRows}
      caption="Class assignments"
      getRowKey={r => r.id}
      defaultSortKey="name"
      rowClassName={rowClassName}
      rowOverlay={renderRowOverlay}
    />
  );
}
