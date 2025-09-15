import React, { useState, useRef } from 'react';
import { PiExport } from 'react-icons/pi';
import { Button } from '../button/Button';
// Define types for our component
interface SearchFilter {
  id: string;
  label: string;
  options?: string[];
}

interface SearchComponentProps {
  placeholder?: string;
  onSearch: (query: string, filters: Record<string, string>) => void;
  filters?: SearchFilter[];
  debounceTime?: number;
  className?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder = 'Search...',
  //   onSearch,
  // filters = [],
  //   debounceTime = 300,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  //   const [selectedFilters, setSelectedFilters] = useState<
  //     Record<string, string>
  //   >({});
  //   const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  //   // Debounce the search to avoid too many requests
  //   useEffect(() => {
  //     const handler = setTimeout(() => {
  //       onSearch(query, selectedFilters);
  //     }, debounceTime);

  //     return () => {
  //       clearTimeout(handler);
  //     };
  //   }, [query, selectedFilters, debounceTime, onSearch]);

  //   // Close filters when clicking outside
  //   useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       if (
  //         filtersRef.current &&
  //         !filtersRef.current.contains(event.target as Node)
  //       ) {
  //         setIsFiltersOpen(false);
  //       }
  //     };

  //     document.addEventListener('mousedown', handleClickOutside);
  //     return () => {
  //       document.removeEventListener('mousedown', handleClickOutside);
  //     };
  //   }, []);

  return (
    <div className={`relative ${className}`} ref={filtersRef}>
      <div className="flex items-center space-x-2">
        <div className="relative text-gray-400 w-[320px] text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-8 py-2 text-pry-text border border-[#D0D5DD] outline-none rounded-lg transition duration-300 ease-linear hover:ring focus:ring-pry-text"
          />
        </div>
        {/* Filter Toggle Button */}
        {/* {filters.length > 0 && ( */}

        <Button
          variant="outline"
          size="md"
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          }
          className="text-pry-text border border-[#D0D5DD] rounded-lg"
        >
          Filter
        </Button>
        <Button
          variant="outline"
          size="md"
          leftIcon={<PiExport size={16} />}
          className="text-pry-text border border-[#D0D5DD] rounded-lg"
        >
          Export
        </Button>

        {/* // )} */}
      </div>
    </div>
  );
};

export default SearchComponent;
