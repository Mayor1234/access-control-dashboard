import { useState } from 'react';
import SearchComponent from '../../../components/ui/search/SearchComponent';
import { Button } from '../../../components/ui/button/Button';
import { GoPlus } from 'react-icons/go';
import Modal from '../../../components/modal/Modal';
import FlatTable from '../../../components/ui/community-management/flat/FlatTable ';
import AddFlat from '../../../components/ui/community-management/flat/AddFlat';

const Flat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = [
    {
      id: 'category',
      label: 'Category',
      options: ['Electronics', 'Clothing', 'Books', 'Home'],
    },
    {
      id: 'status',
      label: 'Status',
      options: ['Active', 'Pending', 'Completed', 'Cancelled'],
    },
    {
      id: 'date',
      label: 'Date Range',
      // No options means it will render a text input
    },
  ];

  const handleSearch = (query: string, filters: Record<string, string>) => {
    console.log('Search query:', query);
    console.log('Filters:', filters);
    // Implement your search logic here
  };
  return (
    <div className="px-5 w-ful">
      <div className="mb-5">
        <SearchComponent
          placeholder="Search..."
          onSearch={handleSearch}
          filters={filters}
          debounceTime={400}
        >
          <Button
            variant="primary"
            size="md"
            leftIcon={<GoPlus />}
            className="rounded-lg py-2"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Add Flat
          </Button>
        </SearchComponent>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          <div className="bg-white text-dark max-w-lg w-full h-full p-10">
            <AddFlat setIsModalOpen={() => setIsModalOpen(!isModalOpen)} />
          </div>
        </Modal>
      )}
      <FlatTable />
    </div>
  );
};

export default Flat;
