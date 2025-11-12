import SearchComponent from '../../../components/ui/search/SearchComponent';
import { Button } from '../../../components/ui/button/Button';
import { GoPlus } from 'react-icons/go';
import Modal from '../../../components/modal/Modal';
import { useState } from 'react';
import AddBuilding from '../../../components/ui/community-management/building/AddBuilding';
import BuildingTable from '../../../components/ui/community-management/building/BuildingTable';

const Building = () => {
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
    <div>
      <div className="px-5 w-full">
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
              Add New Building
            </Button>
          </SearchComponent>
        </div>
        {isModalOpen && (
          <Modal isOpen={isModalOpen}>
            <div className="bg-white text-dark max-w-lg w-full h-full p-10">
              <AddBuilding
                setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
              />
            </div>
          </Modal>
        )}
        <BuildingTable />
      </div>
    </div>
  );
};

export default Building;
