'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ObjectTable, type ObjectTableColumn } from '@/components/ui/ObjectTable';
import type { PreviewInspectionProps } from '@/lib/preview-types';

type AssignmentStatus = 'complete' | 'in-progress' | 'assigned' | 'overdue';

interface MockAssignment {
  id: string;
  name: string;
  type: string;
  sourceProduct: 'Freckle' | 'myON' | 'Lalilo' | 'Nearpod';
  assignedDate: string;
  status: AssignmentStatus;
  studentsCompleted: number;
  totalStudents: number;
  assignedBy: string;
}

const STATUS_LABELS: Record<AssignmentStatus, string> = {
  complete: 'Complete',
  'in-progress': 'In Progress',
  assigned: 'Assigned',
  overdue: 'Overdue',
};

const PRODUCT_COLORS: Record<MockAssignment['sourceProduct'], string> = {
  Freckle: '#2B87FF',
  myON: '#7C3AED',
  Lalilo: '#059669',
  Nearpod: '#F59E0B',
};

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
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

function CompletionRatio({
  studentsCompleted,
  totalStudents,
}: {
  studentsCompleted: number;
  totalStudents: number;
}) {
  return (
    <span
      className="assign-status-count"
      aria-label={`${studentsCompleted} of ${totalStudents} assigned students completed`}
    >
      {studentsCompleted}/{totalStudents}
    </span>
  );
}

function ProductBadge({ product }: { product: MockAssignment['sourceProduct'] }) {
  return (
    <span
      className="assign-product-badge"
      style={{ '--product-color': PRODUCT_COLORS[product] } as React.CSSProperties}
    >
      {product}
    </span>
  );
}

const MOCK_ASSIGNMENTS: MockAssignment[] = [
  {
    id: '1',
    name: 'Algebra: Basic Quiz',
    type: 'Knowledge Check',
    sourceProduct: 'Freckle',
    assignedDate: '2026-02-25',
    status: 'complete',
    studentsCompleted: 25,
    totalStudents: 25,
    assignedBy: 'Me (Jane Doe)',
  },
  {
    id: '2',
    name: 'Fractions Practice',
    type: 'Skills Practice',
    sourceProduct: 'Freckle',
    assignedDate: '2026-02-20',
    status: 'in-progress',
    studentsCompleted: 11,
    totalStudents: 16,
    assignedBy: 'Me (Jane Doe)',
  },
  {
    id: '3',
    name: 'Long Division Practice',
    type: 'Skills Practice',
    sourceProduct: 'Freckle',
    assignedDate: '2026-02-02',
    status: 'assigned',
    studentsCompleted: 0,
    totalStudents: 16,
    assignedBy: 'Me (Jane Doe)',
  },
  {
    id: '4',
    name: 'Multiplication Fluency',
    type: 'Skills Practice',
    sourceProduct: 'Freckle',
    assignedDate: '2026-02-15',
    status: 'in-progress',
    studentsCompleted: 9,
    totalStudents: 25,
    assignedBy: 'Fredrick Crane',
  },
  {
    id: '5',
    name: "Charlotte's Web Ch. 4–6",
    type: 'Reading',
    sourceProduct: 'myON',
    assignedDate: '2026-03-10',
    status: 'overdue',
    studentsCompleted: 8,
    totalStudents: 16,
    assignedBy: 'Me (Jane Doe)',
  },
  {
    id: '6',
    name: 'Short Vowel Blending',
    type: 'Activity',
    sourceProduct: 'Lalilo',
    assignedDate: '2026-03-14',
    status: 'assigned',
    studentsCompleted: 0,
    totalStudents: 25,
    assignedBy: 'Me (Jane Doe)',
  },
];

function DeleteConfirmOverlay({
  assignmentName,
  isExiting,
  onConfirm,
  onCancel,
}: {
  assignmentName: string;
  isExiting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const deleteRef = useRef<HTMLButtonElement>(null);
  const [entered, setEntered] = useState(false);

  // Delay one frame so the browser sees the starting transform before transitioning in
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setEntered(true);
      deleteRef.current?.focus();

      // #region agent log
      const contentEl = deleteRef.current?.closest('.obj-confirm-content') as HTMLElement | null;
      const xBtnEl = contentEl?.closest('td')?.querySelector('.obj-icon-btn') as HTMLElement | null;
      const contentRect = contentEl?.getBoundingClientRect();
      const xBtnRect = xBtnEl?.getBoundingClientRect();
      const contentWidth = contentRect?.width ?? 0;
      const contentRight = contentRect?.right ?? 0;
      const xBtnCenterX = xBtnRect ? xBtnRect.left + xBtnRect.width / 2 : 0;
      const offsetFromContentRight = xBtnCenterX - contentRight;
      const neededOriginPct = contentWidth > 0 ? ((contentWidth + offsetFromContentRight) / contentWidth) * 100 : 0;
      fetch('http://127.0.0.1:7496/ingest/c23544f3-6e9f-4254-a652-6ac74ff2d03c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'647866'},body:JSON.stringify({sessionId:'647866',location:'ClassAssignmentsPreview.tsx:enter-raf',message:'Pivot measurement — content vs X icon',hypothesisId:'PIVOT',data:{contentWidth:Math.round(contentWidth),contentRight:Math.round(contentRight),xBtnCenterX:Math.round(xBtnCenterX),offsetFromContentRight:Math.round(offsetFromContentRight),neededOriginPct:Math.round(neededOriginPct),neededOriginPx:Math.round(contentWidth + offsetFromContentRight)},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const state = isExiting ? 'exiting' : entered ? 'entered' : 'entering';

  return (
    <div
      className="obj-confirm-overlay"
      role="alertdialog"
      aria-label={`Delete ${assignmentName}?`}
    >
      <div className="obj-confirm-content" data-state={state}>
        <span className="obj-confirm-msg">This action can&apos;t be undone.</span>
        <button
          ref={deleteRef}
          type="button"
          className="obj-confirm-delete"
          onClick={onConfirm}
        >
          Delete assignment
        </button>
      </div>
    </div>
  );
}

export function ClassAssignmentsPreview({
  selectedItem,
  isActionAvailable,
  viewCTAs,
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
  const progressSelected = isAttr('Completion Progress');
  const assignedBySelected = isAttr('Created By');
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

  const columns = useMemo((): ObjectTableColumn<MockAssignment>[] => [
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
          <span className={progressSelected ? 'highlighted' : ''}>
            <CompletionRatio studentsCompleted={r.studentsCompleted} totalStudents={r.totalStudents} />
          </span>
        </span>
      ),
    },
    {
      key: 'assignedBy',
      label: 'Assigned by',
      sortable: true,
      getSortValue: r => r.assignedBy,
      render: r => (
        <span className={assignedBySelected ? 'highlighted' : ''}>{r.assignedBy}</span>
      ),
    },
    {
      key: 'actions',
      label: '',
      width: '61px',
      render: r => {
        const isConfirming = r.id === deletingId || r.id === exitingId;
        const isExiting = r.id === exitingId;
        const canDeleteRow = canDelete && r.assignedBy === 'Me (Jane Doe)' && r.status === 'assigned';

        // #region agent log
        if (isConfirming && !isExiting) {
          fetch('http://127.0.0.1:7496/ingest/c23544f3-6e9f-4254-a652-6ac74ff2d03c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'647866'},body:JSON.stringify({sessionId:'647866',location:'ClassAssignmentsPreview.tsx:actions-render',message:'Confirming row rendered',hypothesisId:'D-E',data:{rowId:r.id,rowName:r.name,totalVisibleRows:visibleRows.length,rowIndexInVisible:visibleRows.findIndex(v=>v.id===r.id)},timestamp:Date.now()})}).catch(()=>{});
        }
        // #endregion

        if (isConfirming) {
          return (
            <>
              <DeleteConfirmOverlay
                assignmentName={r.name}
                isExiting={isExiting}
                onConfirm={() => handleDeleteConfirm(r.id)}
                onCancel={handleDeleteCancel}
              />
              <button
                type="button"
                className="obj-icon-btn"
                aria-label="Cancel delete"
                onClick={handleDeleteCancel}
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </>
          );
        }

        return canDeleteRow ? (
          <button
            type="button"
            className={`obj-icon-btn${deleteSelected ? ' highlighted' : ''}`}
            aria-label={`Delete ${r.name}`}
            onClick={() => setDeletingId(r.id)}
          >
            <i className="fa-regular fa-trash-can" aria-hidden="true" />
          </button>
        ) : null;
      },
    },
  ], [
    nameSelected, typeSelected, assignedDateSelected,
    statusSelected, progressSelected, assignedBySelected,
    deleteSelected, canDelete, deletingId, exitingId, handleDeleteConfirm, handleDeleteCancel,
  ]);

  const rowClassName = useCallback(
    (row: MockAssignment) => (row.id === deletingId || row.id === exitingId)
      ? 'obj-table-row--confirming'
      : '',
    [deletingId, exitingId],
  );

  return (
    <ObjectTable
      columns={columns}
      rows={visibleRows}
      caption="Class assignments"
      getRowKey={r => r.id}
      defaultSortKey="name"
      rowClassName={rowClassName}
    />
  );
}
