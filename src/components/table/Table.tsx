// // import { type ReactNode } from 'react';

// // type TableColumn<T> = {
// //   key: keyof T;
// //   label: string | ReactNode;
// //   render?: (value: T[keyof T], row: T, colIndex: number) => ReactNode;
// // };

// // type TableProps<T> = {
// //   columns: TableColumn<T>[];
// //   data: T[];
// //   height?: string;
// // };

// // function Table<T extends Record<string, any>>({
// //   columns,
// //   data,
// //   height,
// // }: TableProps<T>) {
// //   return (
// //     <div className="w-full overflow-x-auto">
// //       <div
// //         className="overflow-y-auto transition-all duration-300 ease-linear scrollbar rounded-t-xl"
// //         style={{ maxHeight: height }}
// //       >
// //         <table className="min-w-full text-sm text-left table-auto border-collapse">
// //           <thead className="sticky top-0 bg-light-text text-[#343942] text-sm w-full z-10">
// //             <tr>
// //               {columns.map((col, colIndex) => (
// //                 <th
// //                   key={colIndex}
// //                   className="py-4 px-2 first:pl-5 last:pr-5 max-w-[200px] font-normal text-gray-500 tracking-wide whitespace-nowrap"
// //                 >
// //                   {col.label}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody className="text-sm text-gray-700 space-y-2">
// //             {data.map((row, rowIndex) => (
// //               <tr
// //                 key={rowIndex}
// //                 className="border-b border-[#E0E4EA] hover:bg-gray-50 transition-colors cursor-pointer"
// //               >
// //                 {columns.map((col, colIndex) => (
// //                   <td
// //                     key={colIndex}
// //                     className="text-gray-600 py-4 px-2 first:pl-5 last:pr-5 max-w-[120px] md:max-w-[200px] whitespace-nowrap"
// //                   >
// //                     <div className="relative">
// //                       {col.render
// //                         ? col.render(row[col.key], row, colIndex)
// //                         : row[col.key]}
// //                     </div>
// //                   </td>
// //                 ))}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Table;

// import { type ReactNode, useState } from 'react';
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

// type TableColumn<T> = {
//   key: keyof T;
//   label: string | ReactNode;
//   render?: (value: T[keyof T], row: T, colIndex: number) => ReactNode;
//   mobileLabel?: string; // Optional mobile-specific label
//   hideOnMobile?: boolean; // Hide column on mobile
//   sticky?: boolean; // Make column sticky on scroll
// };

// type TableProps<T> = {
//   columns: TableColumn<T>[];
//   data: T[];
//   height?: string;
//   onRowClick?: (row: T, index: number) => void;
//   emptyMessage?: string;
//   mobileCardView?: boolean; // Enable card view on mobile (default: true)
//   loading?: boolean;
// };

// function Table<T extends Record<string, any>>({
//   columns,
//   data,
//   height = '600px',
//   onRowClick,
//   emptyMessage = 'No data available',
//   mobileCardView = true,
//   loading = false,
// }: TableProps<T>) {
//   const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

//   const toggleRowExpansion = (index: number) => {
//     const newExpanded = new Set(expandedRows);
//     if (newExpanded.has(index)) {
//       newExpanded.delete(index);
//     } else {
//       newExpanded.add(index);
//     }
//     setExpandedRows(newExpanded);
//   };

//   // Filter columns for mobile view
//   const visibleColumns = columns.filter((col) => !col.hideOnMobile);
//   const hiddenColumns = columns.filter((col) => col.hideOnMobile);

//   // Loading Skeleton
//   if (loading) {
//     return (
//       <div className="w-full">
//         {/* Desktop Loading */}
//         <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
//           <div className="animate-pulse">
//             <div className="bg-gray-100 h-12 mb-2" />
//             {[...Array(5)].map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-white h-16 border-b border-gray-100 flex items-center gap-4 px-4"
//               >
//                 {columns.map((_, j) => (
//                   <div key={j} className="h-4 bg-gray-200 rounded flex-1" />
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Mobile Loading */}
//         <div className="md:hidden space-y-3">
//           {[...Array(3)].map((_, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
//             >
//               <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
//               <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
//               <div className="h-3 bg-gray-200 rounded w-2/3"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Empty State
//   if (data.length === 0) {
//     return (
//       <div className="w-full">
//         <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
//           <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
//             <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
//               />
//             </svg>
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             {emptyMessage}
//           </h3>
//           <p className="text-gray-500 text-sm">No records to display</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       {/* Desktop Table View */}
//       <div className="hidden md:block w-full overflow-x-auto border-b border-border rounded-lg">
//         <div
//           className="overflow-y-auto transition-all duration-300 ease-linear scrollbar"
//           style={{ maxHeight: height }}
//         >
//           <table className="min-w-full text-sm text-left table-auto border-collapse">
//             <thead className="sticky top-0 bg-gray-50 text-[#343942] text-sm w-full z-10 shadow-sm">
//               <tr>
//                 {columns.map((col, colIndex) => (
//                   <th
//                     key={colIndex}
//                     className={`
//                       py-4 px-4 first:pl-6 last:pr-6
//                       font-semibold text-gray-500 tracking-wide
//                       whitespace-nowrap capitalize text-xs
//                       ${col.sticky ? 'sticky left-0 bg-gray-50 z-20' : ''}
//                     `}
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="text-sm text-gray-600 divide-y divide-gray-200 bg-white">
//               {data.map((row, rowIndex) => (
//                 <tr
//                   key={rowIndex}
//                   onClick={() => onRowClick?.(row, rowIndex)}
//                   className={`
//                     hover:bg-gray-50 transition-colors
//                     ${onRowClick ? 'cursor-pointer' : ''}
//                   `}
//                 >
//                   {columns.map((col, colIndex) => (
//                     <td
//                       key={colIndex}
//                       className={`
//                         text-gray-600 py-4 px-4 first:pl-6 last:pr-6
//                         ${col.sticky ? 'sticky left-0 bg-white z-10' : ''}
//                       `}
//                     >
//                       <div className="flex items-center">
//                         {col.render
//                           ? col.render(row[col.key], row, colIndex)
//                           : String(row[col.key] ?? '-')}
//                       </div>
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Tablet View (Horizontal Scroll) */}
//       <div className="hidden sm:block md:hidden w-full overflow-x-auto rounded-lg border border-gray-200">
//         <div style={{ maxHeight: height }} className="overflow-y-auto">
//           <table className="min-w-full text-sm">
//             <thead className="sticky top-0 bg-gray-50 z-10">
//               <tr>
//                 {visibleColumns.map((col, i) => (
//                   <th
//                     key={i}
//                     className="py-3 px-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap"
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.map((row, i) => (
//                 <tr
//                   key={i}
//                   onClick={() => onRowClick?.(row, i)}
//                   className={`hover:bg-gray-50 ${
//                     onRowClick ? 'cursor-pointer' : ''
//                   }`}
//                 >
//                   {visibleColumns.map((col, j) => (
//                     <td
//                       key={j}
//                       className="py-3 px-3 text-gray-600 whitespace-nowrap"
//                     >
//                       {col.render
//                         ? col.render(row[col.key], row, j)
//                         : String(row[col.key] ?? '-')}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile Card View */}
//       {mobileCardView && (
//         <div className="sm:hidden space-y-3">
//           {data.map((row, rowIndex) => {
//             const isExpanded = expandedRows.has(rowIndex);

//             return (
//               <div
//                 key={rowIndex}
//                 className="bg-[#fff] border border-border shadow-sm overflow-hidden"
//               >
//                 {/* Card Header - Always Visible */}
//                 <div
//                   onClick={() => onRowClick?.(row, rowIndex)}
//                   className={`p-4 ${
//                     onRowClick ? 'cursor-pointer active:bg-gray-50' : ''
//                   }`}
//                 >
//                   <div className="space-y-2">
//                     {/* Show first 2-3 important columns */}
//                     {visibleColumns.slice(0, 3).map((col, colIndex) => (
//                       <div
//                         key={colIndex}
//                         className="flex w-full justify-between gap-2"
//                       >
//                         <span className="text-xs text-gray-500 font-medium uppercase tracking-wide flex-shrink-0">
//                           {col.mobileLabel || col.label}
//                         </span>
//                         <span className="text-sm text-gray-900 font-medium text-right flex-1">
//                           {col.render
//                             ? col.render(row[col.key], row, colIndex)
//                             : String(row[col.key] ?? '-')}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Expand Button */}
//                   {(visibleColumns.length > 3 || hiddenColumns.length > 0) && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleRowExpansion(rowIndex);
//                       }}
//                       className="mt-3 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
//                     >
//                       {isExpanded ? 'Show Less' : 'Show More'}
//                       {isExpanded ? (
//                         <MdKeyboardArrowUp className="h-4 w-4" />
//                       ) : (
//                         <MdKeyboardArrowDown className="h-4 w-4" />
//                       )}
//                     </button>
//                   )}
//                 </div>

//                 {/* Expanded Details */}
//                 {isExpanded && (
//                   <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-2">
//                     {/* Remaining visible columns */}
//                     {visibleColumns.slice(3).map((col, colIndex) => (
//                       <div
//                         key={colIndex}
//                         className="flex items-start justify-between gap-2"
//                       >
//                         <span className="text-xs text-gray-500 font-medium uppercase tracking-wide flex-shrink-0">
//                           {col.mobileLabel || col.label}
//                         </span>
//                         <span className="text-sm text-gray-900 text-right flex-1">
//                           {col.render
//                             ? col.render(row[col.key], row, colIndex + 3)
//                             : String(row[col.key] ?? '-')}
//                         </span>
//                       </div>
//                     ))}

//                     {/* Hidden columns */}
//                     {hiddenColumns.map((col, colIndex) => (
//                       <div
//                         key={colIndex}
//                         className="flex items-start justify-between gap-2"
//                       >
//                         <span className="text-xs text-gray-500 font-medium uppercase tracking-wide flex-shrink-0">
//                           {col.mobileLabel || col.label}
//                         </span>
//                         <span className="text-sm text-gray-900 text-right flex-1">
//                           {col.render
//                             ? col.render(row[col.key], row, colIndex)
//                             : String(row[col.key] ?? '-')}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Table;

import { type ReactNode, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Button } from '../ui/button/Button';

type TableColumn<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (value: T[keyof T], row: T, colIndex: number) => ReactNode;
  mobileLabel?: string;
  hideOnMobile?: boolean;
  sticky?: boolean;
  priority?: 'high' | 'medium' | 'low'; // For mobile display priority
  width?: string; // Column width
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  height?: string;
  onRowClick?: (row: T, index: number) => void;
  emptyMessage?: string;
  mobileCardView?: boolean;
  loading?: boolean;
  // New: Custom mobile card renderer
  mobileCardRenderer?: (
    row: T,
    index: number,
    defaultRender: ReactNode
  ) => ReactNode;
  // New: Number of columns to show before "Show More"
  mobileVisibleColumns?: number;
  // New: Custom empty state
  emptyStateRenderer?: () => ReactNode;
};

function Table<T extends Record<string, any>>({
  columns,
  data,
  height = '430px',
  onRowClick,
  emptyMessage = 'No data available',
  mobileCardView = true,
  loading = false,
  mobileCardRenderer,
  mobileVisibleColumns = 3,
  emptyStateRenderer,
}: TableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRowExpansion = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  // Sort columns by priority for mobile
  const sortedColumns = [...columns].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const aPriority = priorityOrder[a.priority || 'medium'];
    const bPriority = priorityOrder[b.priority || 'medium'];
    return aPriority - bPriority;
  });

  // Filter columns for mobile view
  const visibleColumns = sortedColumns.filter((col) => !col.hideOnMobile);
  const primaryColumns = visibleColumns.slice(0, mobileVisibleColumns);
  const secondaryColumns = visibleColumns.slice(mobileVisibleColumns);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="w-full">
        {/* Desktop Loading */}
        <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
          <div className="animate-pulse">
            <div className="bg-gray-100 h-12 mb-2" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white h-16 border-b border-gray-100 flex items-center gap-4 px-4"
              >
                {columns.map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded flex-1" />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Loading */}
        <div className="md:hidden space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
            >
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty State
  if (data.length === 0) {
    if (emptyStateRenderer) {
      return emptyStateRenderer();
    }

    return (
      <div className="w-full">
        <div className="text-center py-12 bg-white rounded-lg border border-border">
          <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {emptyMessage}
          </h3>
          <p className="text-gray-500 text-sm">No records to display</p>
        </div>
      </div>
    );
  }

  // Render cell value
  const renderCellValue = (col: TableColumn<T>, row: T, colIndex: number) => {
    if (col.render) {
      return col.render(row[col.key], row, colIndex);
    }
    const value = row[col.key];
    return value !== null && value !== undefined ? String(value) : '-';
  };

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block w-full overflow-x-auto  border-b border-border">
        <div
          className="overflow-y-auto transition-all duration-300 ease-linear scrollbar"
          style={{ maxHeight: height }}
        >
          <table className="min-w-full text-sm text-left table-auto border-collapse">
            <thead className="sticky top-0 bg-gray-50 text-[#343942] text-sm w-full z-10 shadow-sm">
              <tr>
                {columns.map((col, colIndex) => (
                  <th
                    key={colIndex}
                    style={{ width: col.width }}
                    className={`
                      py-4 px-4 first:pl-6 last:pr-6
                      font-semibold text-gray-600 tracking-wide
                      whitespace-nowrap text-sm
                      ${col.sticky ? 'sticky left-0 bg-gray-50 z-20' : ''}
                    `}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-200 bg-white">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(row, rowIndex)}
                  className={`
                    hover:bg-gray-50 transition-colors
                    ${onRowClick ? 'cursor-pointer' : ''}
                  `}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`
                        text-gray-900 py-4 px-4 first:pl-6 last:pr-6
                        ${col.sticky ? 'sticky left-0 bg-white z-10' : ''}
                      `}
                    >
                      {renderCellValue(col, row, colIndex)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tablet View (Horizontal Scroll) */}
      <div className="hidden sm:block md:hidden w-full overflow-x-auto rounded-lg border border-border">
        <div
          style={{ maxHeight: height }}
          className="overflow-y-auto transition-all duration-300 ease-linear"
        >
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr>
                {visibleColumns.map((col, i) => (
                  <th
                    key={i}
                    className="py-3 px-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, i) => (
                <tr
                  key={i}
                  onClick={() => onRowClick?.(row, i)}
                  className={`hover:bg-gray-50 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {visibleColumns.map((col, j) => (
                    <td
                      key={j}
                      className="py-3 px-3 text-gray-900 whitespace-nowrap"
                    >
                      {renderCellValue(col, row, j)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      {mobileCardView && (
        <div className="sm:hidden space-y-3">
          {data.map((row, rowIndex) => {
            const isExpanded = expandedRows.has(rowIndex);

            // Default card render
            const defaultCardRender = (
              <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden w-full">
                {/* Card Header */}
                <div
                  onClick={() => onRowClick?.(row, rowIndex)}
                  className={`p-4 ${
                    onRowClick ? 'cursor-pointer active:bg-gray-50' : ''
                  }`}
                >
                  {/* Primary Columns */}
                  <div className="space-y-3">
                    {primaryColumns.map((col, colIndex) => (
                      <div
                        key={colIndex}
                        className="flex items-start gap-5 mb-3"
                      >
                        <span className="text-xs text-gray-500 font-medium min-w-[80px] pt-0.5">
                          {col.mobileLabel || col.label}
                        </span>
                        <div className="flex-1 text-sm text-gray-900 font-medium break-words">
                          {renderCellValue(col, row, colIndex)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expand Button */}
                  {secondaryColumns.length > 0 && (
                    <Button
                      size="md"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRowExpansion(rowIndex);
                      }}
                      className="mt-4 w-full flex items-center justify-center gap-1 py-2 text-sm  font-medium bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Show Less
                          <MdKeyboardArrowUp size={16} />
                        </>
                      ) : (
                        <>
                          Show More
                          <MdKeyboardArrowDown size={16} />
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Expanded Details */}
                {isExpanded && secondaryColumns.length > 0 && (
                  <div className="border-t border-gray-200 bg-gray-50 p-4">
                    <div className="space-y-3">
                      {secondaryColumns.map((col, colIndex) => (
                        <div key={colIndex} className="flex items-start gap-3">
                          <span className="text-xs text-gray-500 font-medium min-w-[80px] pt-0.5">
                            {col.mobileLabel || col.label}
                          </span>
                          <div className="flex-1 text-sm text-gray-900 break-words">
                            {renderCellValue(
                              col,
                              row,
                              colIndex + mobileVisibleColumns
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );

            // Use custom renderer if provided
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
