import { useMemo, useState } from 'react';
import Header from '../../components/ui/header/Header';
import { communityData } from '../../constants';
import SearchComponent from '../../components/ui/search/SearchComponent';
import TabButton from '../../components/ui/visitor-log/TabButton';
import CommunityTable from '../../components/ui/community-management/CommunityTable';
import { FaUsers } from 'react-icons/fa6';

type Visitor =
  | 'Resident Directory'
  | 'Estate Street'
  | 'Resident Complains'
  | 'Estate Dues';

const CommunityManagement = () => {
  const [activeTab, setActiveTab] = useState<Visitor>('Resident Directory');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter visitors based on active tab and search term
  const filteredVisitors = useMemo(() => {
    let filtered = communityData;

    // Filter by tab
    if (activeTab !== 'Resident Directory') {
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
            <FaUsers className="h-4 w-4 text-pry" />
          </div>
          <h2 className="font-opensans text-xl text-pry font-semibold capitalize">
            Community Management
          </h2>
        </div>
      </Header>
      {/* <Button variant="primary" size="md" leftIcon={<PiPlus />}>
          Add New Resident
        </Button> */}

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
            label="Resident Directory"
            isActive={activeTab === 'Resident Directory'}
            onClick={() => {
              setActiveTab('Resident Directory');
              setCurrentPage(1);
            }}
          />
          <TabButton
            // tabKey="upcoming"
            label="Estate Street"
            isActive={activeTab === 'Estate Street'}
            onClick={() => {
              setActiveTab('Estate Street');
              setCurrentPage(1);
            }}
          />
          <TabButton
            // tabKey="checked-in"
            label="Resident Complains"
            isActive={activeTab === 'Resident Complains'}
            onClick={() => {
              setActiveTab('Resident Complains');
              setCurrentPage(1);
            }}
          />
          <TabButton
            // tabKey="checked-out"
            label="Estate Dues"
            isActive={activeTab === 'Estate Dues'}
            onClick={() => {
              setActiveTab('Estate Dues');
              setCurrentPage(1);
            }}
          />
        </nav>
      </div>
      <div className="p-5">
        <CommunityTable
          filteredVisitors={filteredVisitors}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default CommunityManagement;
