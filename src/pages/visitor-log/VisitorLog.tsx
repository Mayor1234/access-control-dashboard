import { useMemo, useState } from 'react';
import Header from '../../components/ui/header/Header';
import TabButton from '../../components/ui/visitor-log/TabButton';
import VisitorTable from '../../components/ui/visitor-log/VisitorTable';
import SearchComponent from '../../components/ui/search/SearchComponent';
import { BsPersonVcard } from 'react-icons/bs';
import UserStorage from '../../shared/utils/userStorage';
import { useAppSelector } from '../../redux/app/hook';
import { useGetEstateInvitesQuery } from '../../redux/features/visitors-log/visitorsLogApi';
import type { Invite } from '../../redux/features/visitors-log/visitorsTypes';

type Visitor = 'all' | 'pending' | 'checkin' | 'checkout';

const VisitorLog = () => {
  const [activeTab, setActiveTab] = useState<Visitor>('all');

  const community_admin_id = UserStorage.getCommunityAdminId() as string;

  const community_id = useAppSelector(
    (state) => state.auth.user?.community.id
  ) as string;

  const { data, isLoading } = useGetEstateInvitesQuery({
    community_id,
    community_admin_id,
  });

  const invitesData = useMemo(
    () => (data?.data?.data as Invite[]) || [],
    [data]
  );

  // Filter visitors based on active tab and search term
  const filteredVisitors = useMemo(() => {
    let filtered = invitesData;

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
  }, [activeTab, invitesData]);

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

      {/* Header Tabs */}
      <div className="border-b border-gray-200 px-5 mb-5">
        <nav className="flex space-x-8">
          <TabButton
            label="All Visitors Log"
            isActive={activeTab === 'all'}
            onClick={() => {
              setActiveTab('all');
            }}
          />
          <TabButton
            label="Upcoming Visitors"
            isActive={activeTab === 'pending'}
            onClick={() => {
              setActiveTab('pending');
            }}
          />
          <TabButton
            label="Checked-In Visitors"
            isActive={activeTab === 'checkin'}
            onClick={() => {
              setActiveTab('checkin');
            }}
          />
          <TabButton
            label="Checked-out Visitors"
            isActive={activeTab === 'checkout'}
            onClick={() => {
              setActiveTab('checkout');
            }}
          />
        </nav>
      </div>
      <div className="px-5">
        <SearchComponent
          placeholder="Search..."
          onSearch={handleSearch}
          filters={filters}
          debounceTime={400}
          className="max-w-4xl"
        />
      </div>
      <div className="p-5">
        <VisitorTable
          filteredVisitors={filteredVisitors}
          totalPages={data?.data.meta.totalPages as number}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default VisitorLog;
