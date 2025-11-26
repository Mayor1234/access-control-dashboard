import ApprovalOversightTable from '../../components/ui/approval-oversight/ApprovalOversightTable';

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
