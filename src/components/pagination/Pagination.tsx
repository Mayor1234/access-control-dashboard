import { usePaginationRange } from '../../hooks/usePaginationRange';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { Button } from '../ui/button/Button';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxLength?: number;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  maxLength = 10,
}: PaginationProps) => {
  const pageNumbers = usePaginationRange(totalPages, currentPage, maxLength);

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav aria-label="Pagination Navigation" className=" w-full my-4">
      <ul className="flex items-center justify-end gap-5 px-5 w-full  z-30">
        <Button
          variant="outline"
          size="md"
          leftIcon={<GoArrowLeft size={16} />}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition duration-300 ease-linear  ${
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:border-active hover:text-pry'
          }`}
        >
          Previous
        </Button>

        <div className="flex gap-3">
          {pageNumbers.map((page, i) => (
            <li key={i}>
              <button
                disabled={page === '...'}
                className={`px-3 py-1.5 text-sm border border-border rounded-lg transition duration-300 ease-linear ${
                  page === currentPage
                    ? 'bg-pry text-white border border-pry'
                    : 'hover:border-active hover:text-pry'
                } ${page === '...' ? 'cursor-default' : 'cursor-pointer'}`}
                aria-current={page === currentPage ? 'page' : undefined}
                onClick={() => typeof page === 'number' && onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </div>

        <Button
          variant="outline"
          size="md"
          rightIcon={<GoArrowRight size={16} />}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition duration-300 ease-linear ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:border-active hover:text-pry'
          }`}
        >
          Next
        </Button>
      </ul>
    </nav>
  );
};

export default Pagination;
