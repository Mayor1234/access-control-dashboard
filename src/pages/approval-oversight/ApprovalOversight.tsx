import { HiUsers } from 'react-icons/hi2';
import ApprovalOversightTable from '../../components/ui/approval-oversight/ApprovalOversightTable';
import Header from '../../components/ui/header/Header';
import SearchComponent from '../../components/ui/search/SearchComponent';

const ApprovalOversight = () => {
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
      <Header>
        <div className="space-x-2 flex items-center">
          <div className="bg-linear-to-b from-[#D0D5DD] to-[#fff] p-1 rounded-lg">
            <HiUsers className="h-4 w-4 text-pry" />
          </div>
          <h2 className="font-opensans text-xl text-pry font-semibold capitalize">
            Approval Oversight
          </h2>
        </div>
      </Header>
      <div className="my-5 px-5">
        <SearchComponent
          placeholder="Search..."
          onSearch={handleSearch}
          filters={filters}
          debounceTime={400}
        />
      </div>
      <div className="px-5 mb-5">
        <ApprovalOversightTable />
      </div>
    </section>
  );
};

export default ApprovalOversight;
