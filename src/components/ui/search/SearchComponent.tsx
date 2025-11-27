import React, { useState, useRef, type ReactNode, useEffect } from 'react';
import { PiExport } from 'react-icons/pi';
import { HiOutlineFilter, HiOutlineSearch, HiX } from 'react-icons/hi';
import { Button } from '../button/Button';
import FilterDropdown from './FilterDropdown';

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
  children?: ReactNode;
  onExport?: () => void;
  showExport?: boolean;
  showFilter?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder = 'Search...',
  onSearch,
  filters = [],
  debounceTime = 300,
  className = '',
  children,
  onExport,
  showExport = true,
  showFilter = true,
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilters] = useState<Record<string, string>>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  console.log('isMobileSearchOpen:', isMobileSearchOpen);
  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-focus search input on mobile when opened
  useEffect(() => {
    if (isMobileSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  // Debounce the search
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query, selectedFilters);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [query, selectedFilters, debounceTime, onSearch]);

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setIsFiltersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle clear search
  const handleClearSearch = () => {
    setQuery('');
    setIsMobileSearchOpen(false);
  };

  return (
    <>
      {/* Desktop/Tablet View (≥ 768px) */}
      <div
        className={`hidden md:block relative ${className} w-full`}
        ref={filtersRef}
      >
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Search and Filter Controls */}
          <div className="flex items-center gap-2 flex-1 max-w-4xl">
            {/* Search Input */}
            <div className="relative text-gray-400 flex-1 max-w-md text-sm">
              <HiOutlineSearch className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2.5 text-gray-700 border border-gray-300 outline-none rounded-lg transition-all duration-200 ease-linear hover:border-gray-400 focus:ring-2 focus:ring-active focus:border-transparent"
              />
              {query && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <HiX className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Button */}
            {showFilter && filters.length > 0 && (
              <div className="relative">
                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<HiOutlineFilter className="h-4 w-4" />}
                  className="text-gray-700 border-gray-300 rounded-lg whitespace-nowrap hover:bg-gray-50"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                >
                  <span className="hidden lg:inline">Filter</span>
                </Button>

                {isFiltersOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsFiltersOpen(false)}
                    />
                    <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-full mt-2 w-[90vw] max-w-md lg:w-[377px] max-h-[487px] bg-white border border-gray-200 rounded-lg shadow-xl z-40 overflow-hidden">
                      <FilterDropdown onClose={() => setIsFiltersOpen(false)} />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Export Button */}
            {showExport && (
              <Button
                variant="outline"
                size="md"
                leftIcon={<PiExport size={16} />}
                className="text-gray-700 border-gray-300 rounded-lg whitespace-nowrap hover:bg-gray-50"
                onClick={onExport}
              >
                <span className="hidden lg:inline">Export</span>
              </Button>
            )}
          </div>

          {/* Children (e.g., "Create New" button) */}
          {children && <div className="flex-shrink-0">{children}</div>}
        </div>
      </div>

      {/* Mobile View (< 768px) */}
      <div className={`md:hidden ${className} w-full`}>
        {/* Collapsed State */}
        {isMobile && !isMobileSearchOpen ? (
          <div className="flex items-center justify-between gap-2 w-full">
            {/* Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="flex items-center gap-2 flex-1 px-4 py-2.5 bg-gray-50 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <HiOutlineSearch className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm truncate">{placeholder}</span>
            </button>

            {/* Action Buttons Group */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Filter Button */}
              {showFilter && filters.length > 0 && (
                <button
                  onClick={() => setIsFiltersOpen(true)}
                  className="p-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Open filters"
                >
                  <HiOutlineFilter className="h-5 w-5" />
                </button>
              )}

              {/* Export Button */}
              {showExport && (
                <button
                  onClick={onExport}
                  className="p-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Export"
                >
                  <PiExport className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Expanded Search State */

          <div className="">
            <div className="relative">
              <HiOutlineSearch className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2.5 text-gray-700 border border-gray-300 outline-none rounded-lg transition-all duration-20 ease-linear focus:ring-2 focus:ring-active focus:border-transparent"
              />
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                aria-label="Close search"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Children on Mobile */}
        {children && !isMobileSearchOpen && (
          <div className="px-4 mt-3">{children}</div>
        )}

        {/* Mobile Filter Dropdown */}
        {isFiltersOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40 transition-opacity"
              onClick={() => setIsFiltersOpen(false)}
            />

            {/* Bottom Sheet */}
            <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden animate-slide-up">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setIsFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close filters"
                >
                  <HiX className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(80vh-60px)]">
                <FilterDropdown onClose={() => setIsFiltersOpen(false)} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchComponent;
