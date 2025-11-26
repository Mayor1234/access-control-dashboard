import SearchComponent from '../../../components/ui/search/SearchComponent';
import { Button } from '../../../components/ui/button/Button';
import ManageUsersTable from '../../../components/ui/settings/ManageUsersTable';
import { GoPlus } from 'react-icons/go';
import { useState } from 'react';
import Modal from '../../../components/modal/Modal';
import AddAdminUser from '../../../components/ui/settings/AddAdminUser';

const ManageUsers = () => {
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
    <section>
      <div className="my-5 px-5 w-full">
        <SearchComponent
          placeholder="Search..."
          onSearch={handleSearch}
          filters={filters}
          debounceTime={400}
        >
          <Button
            variant="primary"
            size="md"
            className="rounded-lg py-2"
            leftIcon={<GoPlus size={16} />}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Create New User
          </Button>
        </SearchComponent>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          <div className="bg-white text-dark max-w-lg w-full h-full">
            <AddAdminUser setIsModalOpen={() => setIsModalOpen(!isModalOpen)} />
          </div>
        </Modal>
      )}
      <div className="px-5 mb-5">
        <ManageUsersTable />
      </div>
    </section>
  );
};

export default ManageUsers;
