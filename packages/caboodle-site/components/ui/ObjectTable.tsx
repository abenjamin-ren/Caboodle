'use client';

import { useState, useMemo } from 'react';

export interface ObjectTableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'start' | 'center';
  getSortValue?: (row: T) => string | number;
  render: (row: T) => React.ReactNode;
}

interface ObjectTableProps<T> {
  columns: ObjectTableColumn<T>[];
  rows: T[];
  caption: string;
  getRowKey: (row: T, index: number) => string | number;
  defaultSortKey?: string;
  defaultSortDir?: 'asc' | 'desc';
  rowClassName?: (row: T, index: number) => string;
}

export function ObjectTable<T>({
  columns,
  rows,
  caption,
  getRowKey,
  defaultSortKey,
  defaultSortDir = 'asc',
  rowClassName,
}: ObjectTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(defaultSortKey ?? null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(defaultSortDir);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    const col = columns.find(c => c.key === sortKey);
    if (!col?.getSortValue) return rows;
    return [...rows].sort((a, b) => {
      const av = col.getSortValue!(a);
      const bv = col.getSortValue!(b);
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortKey, sortDir, columns]);

  return (
    <div className="obj-table-wrap">
      <table className="obj-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map(col => {
              const isActive = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={[
                    'obj-th',
                    isActive ? 'obj-th--active' : '',
                    col.align === 'center' ? 'obj-th--center' : '',
                  ].filter(Boolean).join(' ')}
                  style={col.width ? { inlineSize: col.width } : undefined}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      className="obj-th-sort"
                      aria-label={`Sort by ${col.label.toLowerCase()}, ${isActive ? sortDir + 'ending' : 'unsorted'}`}
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                      <i
                        className={`fa-solid ${isActive && sortDir === 'desc' ? 'fa-arrow-down' : 'fa-arrow-up'} obj-sort-icon${isActive ? '' : ' obj-sort-icon--idle'}`}
                        aria-hidden="true"
                      />
                    </button>
                  ) : col.label ? (
                    col.label
                  ) : (
                    <span className="sr-only">Actions</span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) => (
            <tr
              key={getRowKey(row, i)}
              className={['obj-table-row', rowClassName?.(row, i) ?? ''].filter(Boolean).join(' ')}
            >
              {columns.map(col => (
                <td
                  key={col.key}
                  className={[
                    'obj-td',
                    col.align === 'center' ? 'obj-td--center' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
