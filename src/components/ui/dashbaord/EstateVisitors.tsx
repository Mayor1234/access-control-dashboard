import { FaRegCalendarMinus } from 'react-icons/fa6';
import PieChart from '../../charts/PieChart';
import { Button } from '../button/Button';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useGetDashboardOverviewVisitorPieQuery } from '../../../redux/features/dashboard/dashboardApi';
import UserStorage from '../../../shared/utils/userStorage';

const EstateVisitors = () => {
  const community_user_id = UserStorage.getUserId() ?? '';
  const community_id = UserStorage.getCommunityId() ?? '';

  const { data, isLoading, isError, refetch } =
    useGetDashboardOverviewVisitorPieQuery({
      community_id,
      community_user_id,
    });

  // Skeleton Loader for Pie Chart
  const PieChartSkeleton = () => (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-48 h-48 rounded-full border-8 border-gray-200 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="border border-[#E6E9EE] rounded-lg w-full md:w-[40%] h-full md:h-full overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-5 py-3 border-b border-[#E6E9EE]">
        {/* Title Section */}
        <h2 className="font-opensans font-medium text-sm sm:text-base text-gray-900 whitespace-nowrap">
          Estate Visitors
        </h2>

        <Button
          variant="outline"
          size="md"
          className="rounded-xl py-2"
          leftIcon={<FaRegCalendarMinus size={16} />}
          rightIcon={<MdOutlineKeyboardArrowDown size={20} />}
          disabled={isLoading}
        >
          6 Month
        </Button>
      </div>

      {/* Content Area */}
      <div className="h-full w-full p-3 sm:p-5 overflow-hidden">
        {/* Loading State - Skeleton */}
        {isLoading && <PieChartSkeleton />}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full w-full md:h-72 text-center px-4">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-red-300 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-gray-600 font-medium mb-2">
              Failed to load data
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Unable to fetch visitor statistics
            </p>
            <Button variant="primary" size="md" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && !data?.data && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-gray-600 font-medium mb-1">No visitor data</p>
            <p className="text-gray-400 text-sm">
              Visitor statistics will appear here
            </p>
          </div>
        )}

        {/* Success State - Show Chart */}
        {!isLoading && !isError && data?.data && (
          <div className="h-full w-full md:h-72">
            <PieChart pieData={data.data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EstateVisitors;
