// import { useState } from 'react';
// import SimpleBar from '../../charts/SimpleBarChart';
// import { useAppSelector } from '../../../redux/app/hook';
// import { useGetDashboardOverviewDailyVisitorQuery } from '../../../redux/features/dashboard/dashboardApi';
// import { formatFullDate } from '../../../shared/helper/formatDate';
// import Spinners from '../../spinnners/Spinners';
// import { DatePicker } from '../date-picker/DatePicker';

// const DailyVisitors = () => {
//   // Start with current date instead of null
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());

//   const community = useAppSelector((state) => state.auth.user);

//   const { data, isLoading } = useGetDashboardOverviewDailyVisitorQuery({
//     community_id: community?.community.id as string,
//     community_user_id: community?.id as string,
//     date: selectedDate,
//   });

//   const chartData =
//     data?.data?.estate_data?.map((item) => ({
//       date: formatFullDate(item.day),
//       visitors: parseInt(item.visitors_count, 10),
//     })) || [];

//   // Get current month/year for display
//   const currentMonthYear = selectedDate.toLocaleDateString('en-US', {
//     month: 'long',
//     // year: 'numeric',
//   });

//   return (
//     <div className="border border-[#E6E9EE] rounded-lg w-full md:w-[60%] h-full">
//       <div className="w-full flex items-center justify-between px-5 py-3 border-b border-[#E6E9EE]">
//         <div className="flex gap-2">
//           <h2 className="font-opensans font-medium text-gray-900">
//             Daily Visitors
//           </h2>
//           <p className="text-sm text-pry">({currentMonthYear})</p>
//         </div>
//         <DatePicker
//           value={selectedDate}
//           onChange={(date) => date && setSelectedDate(date)}
//           placeholder="Choose a date"
//           disabled={isLoading}
//         />
//       </div>
//       <div className="h-72 w-full p-5">
//         {isLoading ? (
//           <div className="flex items-center justify-center h-full">
//             <Spinners variant="default" size="xl" color="primary" />
//           </div>
//         ) : chartData.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full text-center">
//             <p className="text-pry-light mb-2">No visitor data available</p>
//             <p className="text-pry text-sm">Try selecting a different month</p>
//           </div>
//         ) : (
//           <SimpleBar pry="#31C65B" data={chartData} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default DailyVisitors;

import { useState } from 'react';
import SimpleBar from '../../charts/SimpleBarChart';
import { useAppSelector } from '../../../redux/app/hook';
import { useGetDashboardOverviewDailyVisitorQuery } from '../../../redux/features/dashboard/dashboardApi';
import { formatFullDate } from '../../../shared/helper/formatDate';
import Spinners from '../../spinnners/Spinners';
import { DatePicker } from '../date-picker/DatePicker';
// import { HiCalendar } from 'react-icons/hi2';

const DailyVisitors = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showMobileDatePicker, setShowMobileDatePicker] = useState(false);

  const community = useAppSelector((state) => state.auth.user);

  const { data, isLoading, isError, refetch } =
    useGetDashboardOverviewDailyVisitorQuery({
      community_id: community?.community.id as string,
      community_user_id: community?.id as string,
      date: selectedDate,
    });

  const chartData =
    data?.data?.estate_data?.map((item) => ({
      date: formatFullDate(item.day),
      visitors: parseInt(item.visitors_count, 10),
    })) || [];

  // Get current month/year for display
  const currentMonthYear = selectedDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // const currentMonth = selectedDate.toLocaleDateString('en-US', {
  //   month: 'short',
  // });

  // Calculate total visitors
  const totalVisitors = chartData.reduce((sum, item) => sum + item.visitors, 0);

  return (
    <div className="border border-gray-200 rounded-lg w-full lg:w-[60%] h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-2 sm:py-3 border-b border-border bg-white">
        {/* Title Section */}
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="font-opensans font-medium text-sm sm:text-base text-gray-900 whitespace-nowrap">
            Daily Visitors
          </h2>
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            ({currentMonthYear})
          </span>

          {/* Mobile: Show total visitors */}
          {!isLoading && chartData.length > 0 && (
            <span className="sm:hidden ml-auto px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              {totalVisitors} total
            </span>
          )}
        </div>

        {/* Date Picker - Desktop */}
        <div className="hidden sm:block">
          <DatePicker
            value={selectedDate}
            onChange={(date) => date && setSelectedDate(date)}
            placeholder="Choose a date"
            disabled={isLoading}
            className="w-full sm:w-auto"
          />
        </div>

        {/* Mobile Date Picker Dropdown */}
        {showMobileDatePicker && (
          <>
            <div className="sm:hidden">
              <DatePicker
                value={selectedDate}
                onChange={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setShowMobileDatePicker(false);
                  }
                }}
                placeholder="Choose a date"
                disabled={isLoading}
              />
            </div>
          </>
        )}
      </div>

      {/* Chart Area */}
      <div className="flex-1 w-full p-3 sm:p-5 overflow-hidden">
        <div className="h-full w-full min-h-[250px] sm:min-h-[280px]">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Spinners variant="default" size="xl" color="primary" />
              <p className="text-sm text-gray-500">Loading visitor data...</p>
            </div>
          )}

          {/* Error State */}
          {isError && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 text-red-300">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Failed to load data
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mb-4">
                Unable to fetch visitor statistics
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && chartData.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 text-gray-300">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 font-medium mb-2 text-sm sm:text-base">
                No visitor data available
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                Try selecting a different month
              </p>
            </div>
          )}

          {/* Chart Display */}
          {!isLoading && !isError && chartData.length > 0 && (
            <div className="h-full w-full">
              <SimpleBar pry="#31C65B" data={chartData} />

              {/* Mobile Stats Summary */}
              <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Total Visitors</p>
                  <p className="text-lg font-bold text-green-600">
                    {totalVisitors}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Days Tracked</p>
                  <p className="text-lg font-bold text-gray-900">
                    {chartData.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyVisitors;
