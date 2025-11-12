import { useState } from 'react';

import SearchComponent from '../../../components/ui/search/SearchComponent';
import { Button } from '../../../components/ui/button/Button';
import { GoPlus } from 'react-icons/go';
import Modal from '../../../components/modal/Modal';
import AddEstateStreet from '../../../components/ui/community-management/street/AddEstateStreet';
import EstateStreetsTable from '../../../components/ui/community-management/street/EstateStreetsTable';

const EstateStreet = () => {
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
            Add Street
          </Button>
        </SearchComponent>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          <div className="bg-white text-dark max-w-lg w-full h-full p-10">
            <AddEstateStreet
              setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
            />
          </div>
        </Modal>
      )}
      <EstateStreetsTable />
    </div>
  );
};

export default EstateStreet;
