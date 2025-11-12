import SearchComponent from '../../../components/ui/search/SearchComponent';
import ResidentTable from '../../../components/ui/community-management/resident/ResidentTable';

const Resident = () => {
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
    <div className="px-5 w-full">
      <div className="mb-5">
        <SearchComponent
          placeholder="Search..."
          onSearch={handleSearch}
          filters={filters}
          debounceTime={400}
        ></SearchComponent>
      </div>

      <ResidentTable />
    </div>
  );
};

export default Resident;
