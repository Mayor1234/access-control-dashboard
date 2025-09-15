import { useMemo, useState } from 'react';
import Header from '../../components/ui/header/Header';
import { visitorsData } from '../../constants';
import TabButton from '../../components/ui/visitor-log/TabButton';
import VisitorTable from '../../components/ui/visitor-log/VisitorTable';
import SearchComponent from '../../components/ui/search/SearchComponent';
import { BsPersonVcard } from 'react-icons/bs';

// import TabButton from './TabButton';
// import VisitorTable from './VisitorTable';

type Visitor = 'all' | 'upcoming' | 'checked-in' | 'checked-out';

const VisitorLog = () => {
  const [activeTab, setActiveTab] = useState<Visitor>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter visitors based on active tab and search term
  const filteredVisitors = useMemo(() => {
    let filtered = visitorsData;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter((visitor) => visitor.status === activeTab);
    }

    // // Filter by search term
    // if (searchTerm) {
    //   filtered = filtered.filter(visitor =>
    //     visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     visitor.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     visitor.accessCode.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    // }

    return filtered;
  }, [activeTab /*searchTerm*/]);

  // // Count visitors by status
  // const getVisitorCounts = () => {
  //   const all = visitors.length;
  //   const upcoming = visitors.filter((v) => v.status === 'upcoming').length;
  //   const checkedIn = visitors.filter((v) => v.status === 'checked-in').length;
  //   const checkedOut = visitors.filter(
  //     (v) => v.status === 'checked-out'
  //   ).length;

  //   return { all, upcoming, checkedIn, checkedOut };
  // };

  // const counts = getVisitorCounts();

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
    <section className="h-screen">
      <Header>
        <div className="space-x-2 flex items-center">
          <div className="bg-linear-to-b from-[#D0D5DD] to-[#fff] p-1 rounded-lg">
            <BsPersonVcard className="h-4 w-4 text-pry" />
          </div>
          <h1 className="font-opensans text-xl text-pry font-semibold capitalize">
            Visitors Log
          </h1>
        </div>
      </Header>
      <div className="my-5 px-5">
        <SearchComponent
          placeholder="Search..."
          onSearch={handleSearch}
          filters={filters}
          debounceTime={400}
          className="max-w-4xl"
        />
      </div>

      {/* Header Tabs */}
      <div className="border-b border-gray-200 px-5">
        <nav className="flex space-x-8">
          <TabButton
            // tabKey="all"
            label="All Visitors Log"
            isActive={activeTab === 'all'}
            onClick={() => {
              setActiveTab('all');
              setCurrentPage(1);
            }}
          />
          <TabButton
            // tabKey="upcoming"
            label="Upcoming Visitors"
            isActive={activeTab === 'upcoming'}
            onClick={() => {
              setActiveTab('upcoming');
              setCurrentPage(1);
            }}
          />
          <TabButton
            // tabKey="checked-in"
            label="Checked-In Visitors"
            isActive={activeTab === 'checked-in'}
            onClick={() => {
              setActiveTab('checked-in');
              setCurrentPage(1);
            }}
          />
          <TabButton
            // tabKey="checked-out"
            label="Checked-out Visitors"
            isActive={activeTab === 'checked-out'}
            onClick={() => {
              setActiveTab('checked-out');
              setCurrentPage(1);
            }}
          />
        </nav>
      </div>
      <div className="p-5">
        <VisitorTable
          filteredVisitors={filteredVisitors}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default VisitorLog;
