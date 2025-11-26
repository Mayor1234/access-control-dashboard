// import { useMemo, useState } from 'react';
// import Header from '../../components/ui/header/Header';
// import TabButton from '../../components/ui/visitor-log/TabButton';
// import VisitorTable from '../../components/ui/visitor-log/VisitorTable';
// import SearchComponent from '../../components/ui/search/SearchComponent';
// import { BsPersonVcard } from 'react-icons/bs';
// import UserStorage from '../../shared/utils/userStorage';
// import { useAppSelector } from '../../redux/app/hook';
// import { useGetEstateInvitesQuery } from '../../redux/features/visitors-log/visitorsLogApi';
// import type { Invite } from '../../redux/features/visitors-log/visitorsTypes';

// type Visitor = 'all' | 'pending' | 'checkin' | 'checkout';

// const VisitorLog = () => {
//   const [activeTab, setActiveTab] = useState<Visitor>('all');

//   const community_admin_id = UserStorage.getCommunityAdminId() as string;

//   const community_id = useAppSelector(
//     (state) => state.auth.user?.community.id
//   ) as string;

//   const { data, isLoading } = useGetEstateInvitesQuery({
//     community_id,
//     community_admin_id,
//   });

//   const invitesData = useMemo(
//     () => (data?.data?.data as Invite[]) || [],
//     [data]
//   );

//   // Filter visitors based on active tab and search term
//   const filteredVisitors = useMemo(() => {
//     let filtered = invitesData;

//     // Filter by tab
//     if (activeTab !== 'all') {
//       filtered = filtered.filter((visitor) => visitor.status === activeTab);
//     }

//     // // Filter by search term
//     // if (searchTerm) {
//     //   filtered = filtered.filter(visitor =>
//     //     visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //     visitor.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //     visitor.accessCode.toLowerCase().includes(searchTerm.toLowerCase())
//     //   );
//     // }

//     return filtered;
//   }, [activeTab, invitesData]);

//   const filters = [
//     {
//       id: 'category',
//       label: 'Category',
//       options: ['Electronics', 'Clothing', 'Books', 'Home'],
//     },
//     {
//       id: 'status',
//       label: 'Status',
//       options: ['Active', 'Pending', 'Completed', 'Cancelled'],
//     },
//     {
//       id: 'date',
//       label: 'Date Range',
//       // No options means it will render a text input
//     },
//   ];

//   const handleSearch = (query: string, filters: Record<string, string>) => {
//     console.log('Search query:', query);
//     console.log('Filters:', filters);
//     // Implement your search logic here
//   };

//   return (
//     <section className="h-screen">
//       <Header>
//         <div className="space-x-2 flex items-center">
//           <div className="bg-linear-to-b from-[#D0D5DD] to-[#fff] p-1 rounded-lg">
//             <BsPersonVcard className="h-4 w-4 text-pry" />
//           </div>
//           <h1 className="font-opensans text-xl text-pry font-semibold capitalize">
//             Visitors Log
//           </h1>
//         </div>
//       </Header>

//       {/* Header Tabs */}
//       <div className="border-b border-gray-200 px-5 mb-5">
//         <nav className="flex space-x-8">
//           <TabButton
//             label="All Visitors Log"
//             isActive={activeTab === 'all'}
//             onClick={() => {
//               setActiveTab('all');
//             }}
//           />
//           <TabButton
//             label="Upcoming Visitors"
//             isActive={activeTab === 'pending'}
//             onClick={() => {
//               setActiveTab('pending');
//             }}
//           />
//           <TabButton
//             label="Checked-In Visitors"
//             isActive={activeTab === 'checkin'}
//             onClick={() => {
//               setActiveTab('checkin');
//             }}
//           />
//           <TabButton
//             label="Checked-out Visitors"
//             isActive={activeTab === 'checkout'}
//             onClick={() => {
//               setActiveTab('checkout');
//             }}
//           />
//         </nav>
//       </div>
//       <div className="px-5">
//         <SearchComponent
//           placeholder="Search..."
//           onSearch={handleSearch}
//           filters={filters}
//           debounceTime={400}
//           className="max-w-4xl"
//         />
//       </div>
//       <div className="p-5">
//         <VisitorTable
//           filteredVisitors={filteredVisitors}
//           totalPages={data?.data.meta.totalPages as number}
//           isLoading={isLoading}
//         />
//       </div>
//     </section>
//   );
// };

// export default VisitorLog;

import { useMemo, useState } from 'react';
// import Header from '../../components/ui/header/Header';
import TabButton from '../../components/ui/visitor-log/TabButton';
import VisitorTable from '../../components/ui/visitor-log/VisitorTable';
import SearchComponent from '../../components/ui/search/SearchComponent';
// import { BsPersonVcard } from 'react-icons/bs';
import UserStorage from '../../shared/utils/userStorage';
import { useAppSelector } from '../../redux/app/hook';
import { useGetEstateInvitesQuery } from '../../redux/features/visitors-log/visitorsLogApi';
import type { Invite } from '../../redux/features/visitors-log/visitorsTypes';
import { MdKeyboardArrowDown } from 'react-icons/md';

type Visitor = 'all' | 'pending' | 'checkin' | 'checkout';

const VisitorLog = () => {
  const [activeTab, setActiveTab] = useState<Visitor>('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  // Filter visitors based on active tab
  const filteredVisitors = useMemo(() => {
    let filtered = invitesData;

    if (activeTab !== 'all') {
      filtered = filtered.filter((visitor) => visitor.status === activeTab);
    }

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
    },
  ];

  const handleSearch = (query: string, filters: Record<string, string>) => {
    console.log('Search query:', query);
    console.log('Filters:', filters);
  };

  const tabs = [
    { id: 'all', label: 'All Visitors Log', count: invitesData.length },
    {
      id: 'pending',
      label: 'Upcoming',
      shortLabel: 'Upcoming',
      count: invitesData.filter((v) => v.status === 'pending').length,
    },
    {
      id: 'checkin',
      label: 'Checked-In',
      shortLabel: 'Checked-In',
      count: invitesData.filter((v) => v.status === 'checkin').length,
    },
    {
      id: 'checkout',
      label: 'Checked-Out',
      shortLabel: 'Checked-Out',
      count: invitesData.filter((v) => v.status === 'checkout').length,
    },
  ];

  return (
    <section className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      {/* <Header>
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-b from-[#D0D5DD] to-[#fff] p-1.5 sm:p-2 rounded-lg">
            <BsPersonVcard className="h-4 w-4 sm:h-5 sm:w-5 text-pry" />
          </div>
          <h1 className="font-opensans text-base sm:text-xl text-pry font-semibold">
            Visitors Log
          </h1>
        </div>
      </Header> */}

      {/* Desktop Tabs - Hidden on Mobile */}
      <div className="hidden md:block border-b border-border px-4 lg:px-5">
        <nav className="flex space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as Visitor)}
            />
          ))}
        </nav>
      </div>

      {/* Mobile Dropdown Tabs */}
      <div className="md:hidden px-4 py-3 border-b border-gray-200 bg-white">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </span>
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {tabs.find((tab) => tab.id === activeTab)?.count}
            </span>
          </div>
          <MdKeyboardArrowDown
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
              showMobileFilters ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Mobile Dropdown Menu */}
        {showMobileFilters && (
          <div className="absolute left-0 right-0 mt-2 mx-4 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as Visitor);
                  setShowMobileFilters(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium">{tab.label}</span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Component */}
      <div className="px-4 py-3 sm:px-5 sm:py-4 bg-white border-b border-gray-200">
        <SearchComponent
          placeholder="Search visitors..."
          onSearch={handleSearch}
          filters={filters}
          debounceTime={400}
          className="w-full max-w-4xl"
        />
      </div>

      {/* Table Container - Scrollable */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto px-4 py-4 sm:px-5">
          <VisitorTable
            filteredVisitors={filteredVisitors}
            totalPages={data?.data.meta.totalPages as number}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default VisitorLog;
