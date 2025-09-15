import { useMemo } from 'react';

export const usePaginationRange = (
  totalPages: number,
  currentPage: number,
  maxLength: number = 7
): (number | string)[] => {
  return useMemo(() => {
    const range: (number | string)[] = [];

    if (totalPages <= maxLength) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
      return range;
    }

    const left = Math.max(currentPage - 1, 2);
    const right = Math.min(currentPage + 1, totalPages - 1);

    if (currentPage <= 3) {
      for (let i = 1; i <= 3; i++) range.push(i);
      range.push('...');
      range.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      range.push(1);
      range.push('...');
      for (let i = totalPages - 2; i <= totalPages; i++) range.push(i);
    } else {
      range.push(1);
      range.push('...');
      for (let i = left; i <= right; i++) range.push(i);
      range.push('...');
      range.push(totalPages);
    }

    return range;
  }, [totalPages, currentPage, maxLength]);
};
