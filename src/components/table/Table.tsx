import { type ReactNode, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

type TableColumn<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (value: T[keyof T], row: T, colIndex: number) => ReactNode;
  mobileLabel?: string;
  hideOnMobile?: boolean;
  sticky?: boolean;
  priority?: 'high' | 'medium' | 'low';
  width?: string;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  height?: string;
  onRowClick?: (row: T, index: number) => void;
  emptyMessage?: string;
  mobileCardView?: boolean;
  loading?: boolean;
  mobileCardRenderer?: (
    row: T,
    index: number,
    defaultRender: ReactNode,
  ) => ReactNode;
  mobileVisibleColumns?: number;
  emptyStateRenderer?: () => ReactNode;
};

function Table<T extends Record<string, any>>({
  columns,
  data,
  height = '430px',
  onRowClick,
  emptyMessage = 'No records available to display',
  mobileCardView = true,
  loading = false,
  mobileCardRenderer,
  mobileVisibleColumns = 3,
  emptyStateRenderer,
}: TableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRowExpansion = (index: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const sortedColumns = [...columns].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority ?? 'medium'] - order[b.priority ?? 'medium'];
  });

  const visibleColumns = sortedColumns.filter((col) => !col.hideOnMobile);
  const primaryColumns = visibleColumns.slice(0, mobileVisibleColumns);
  const secondaryColumns = visibleColumns.slice(mobileVisibleColumns);

  // Only return a label if it's a plain string — ReactNode labels (e.g. checkbox headers)
  // are intentional for desktop but wrong to render inside a mobile card label slot.
  const getMobileLabel = (col: TableColumn<T>): string | null => {
    if (col.mobileLabel) return col.mobileLabel;
    if (typeof col.label === 'string') return col.label;
    return null;
  };

  const renderCellValue = (
    col: TableColumn<T>,
    row: T,
    colIndex: number,
  ): ReactNode => {
    if (col.render) return col.render(row[col.key], row, colIndex);
    const value = row[col.key];
    return value != null ? String(value) : '-';
  };

  // ─── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full">
        <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 animate-pulse">
          <div className="bg-gray-100 h-12" />
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="h-14 border-b border-gray-100 flex items-center gap-4 px-6"
            >
              {columns.map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded flex-1" />
              ))}
            </div>
          ))}
        </div>
        <div className="md:hidden space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse space-y-3"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Empty state ────────────────────────────────────────────────────────────
  if (data.length === 0) {
    if (emptyStateRenderer) return emptyStateRenderer();
    return (
      <div className="w-full">
        <div className="flex items-center justify-center text-center py-16 h-full rounded-xl"> 
          <h3 className="text-base text-gray-500">
            {emptyMessage}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ─── Desktop + Tablet table (md and above) ─────────────────────────── */}
      <div className="hidden md:block w-full overflow-x-auto border-b border-border">
        <div
          className="overflow-y-auto transition-all duration-300 ease-linear"
          style={{ maxHeight: height }}
        >
          <table className="min-w-full text-sm text-left table-auto border-collapse">
            <thead className="sticky top-0 bg-gray-50 z-10 shadow-sm">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    style={{ width: col.width }}
                    className={`py-4 px-4 first:pl-6 last:pr-6 font-semibold text-gray-600 whitespace-nowrap text-sm ${
                      col.sticky ? 'sticky left-0 bg-gray-50 z-20' : ''
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((row, rowIndex) => (
                <tr
                  key={'id' in row ? String((row as Record<string, unknown>).id) : rowIndex}
                  onClick={() => onRowClick?.(row, rowIndex)}
                  className={`hover:bg-gray-50 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-4 px-4 first:pl-6 last:pr-6 text-gray-900 max-w-60 ${
                        col.sticky ? 'sticky left-0 bg-white z-10' : ''
                      }`}
                    >
                      <div className="truncate">
                        {renderCellValue(col, row, colIndex)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Mobile card view (below md) ───────────────────────────────────── */}
      {mobileCardView && (
        <div className="md:hidden space-y-3">
          {data.map((row, rowIndex) => {
            const isExpanded = expandedRows.has(rowIndex);
            const rowKey = 'id' in row ? String((row as Record<string, unknown>).id) : rowIndex;

            const defaultCardRender = (
              <div
                key={rowKey}
                className="bg-white rounded-xl border border-border shadow-sm overflow-hidden"
              >
                {/* Card body */}
                <div
                  onClick={() => onRowClick?.(row, rowIndex)}
                  className={`p-4 ${
                    onRowClick ? 'cursor-pointer active:bg-gray-50' : ''
                  }`}
                >
                  <div className="space-y-2.5">
                    {primaryColumns.map((col, colIndex) => {
                      const label = getMobileLabel(col);
                      return (
                        <div key={colIndex} className="flex items-start gap-3">
                          {label && (
                            <span className="text-xs text-gray-500 font-medium w-24 shrink-0 pt-0.5 leading-5">
                              {label}
                            </span>
                          )}
                          <div
                            className={`text-sm text-gray-900 font-medium wrap-break-words min-w-0 flex-1 ${
                              !label ? 'w-full' : ''
                            }`}
                          >
                            {renderCellValue(col, row, colIndex)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {secondaryColumns.length > 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRowExpansion(rowIndex);
                      }}
                      className="mt-3 w-full flex items-center justify-center gap-1 py-2 text-xs font-medium text-pry bg-gray-50 hover:bg-gray-100 rounded-lg border border-border transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Show Less
                          <MdKeyboardArrowUp size={14} />
                        </>
                      ) : (
                        <>
                          Show More
                          <MdKeyboardArrowDown size={14} />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Expanded extra columns */}
                {isExpanded && secondaryColumns.length > 0 && (
                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 space-y-2.5">
                    {secondaryColumns.map((col, colIndex) => {
                      const label = getMobileLabel(col);
                      return (
                        <div key={colIndex} className="flex items-start gap-3">
                          {label && (
                            <span className="text-xs text-gray-500 font-medium w-24 shrink-0 pt-0.5 leading-5">
                              {label}
                            </span>
                          )}
                          <div className="text-sm text-gray-900 wrap-break-words min-w-0 flex-1">
                            {renderCellValue(
                              col,
                              row,
                              colIndex + mobileVisibleColumns,
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );

            return mobileCardRenderer
              ? mobileCardRenderer(row, rowIndex, defaultCardRender)
              : defaultCardRender;
          })}
        </div>
      )}
    </div>
  );
}

export default Table;
