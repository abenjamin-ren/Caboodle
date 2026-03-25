'use client';

import { useMemo } from 'react';
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

export function ClassAssignmentsPreview({
  selectedItem,
  isActionAvailable,
  viewCTAs,
}: Partial<PreviewInspectionProps>) {
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
        const canDeleteRow = canDelete && r.assignedBy === 'Me (Jane Doe)' && r.status === 'assigned';
        return canDeleteRow ? (
          <button
            type="button"
            className={`obj-icon-btn${deleteSelected ? ' highlighted' : ''}`}
            aria-label="Delete assignment"
          >
            <i className="fa-regular fa-trash-can" aria-hidden="true" />
          </button>
        ) : null;
      },
    },
  ], [
    nameSelected, typeSelected, assignedDateSelected,
    statusSelected, progressSelected, assignedBySelected, deleteSelected, canDelete,
  ]);

  return (
    <ObjectTable
      columns={columns}
      rows={MOCK_ASSIGNMENTS}
      caption="Class assignments"
      getRowKey={r => r.id}
      defaultSortKey="name"
    />
  );
}
