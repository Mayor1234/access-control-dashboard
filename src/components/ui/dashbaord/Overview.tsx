import { Button } from '../button/Button';
import { FaRegCalendarMinus } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useGetDashboardOverviewQuery } from '../../../redux/features/dashboard/dashboardApi';
import { useAppSelector } from '../../../redux/app/hook';
import Spinners from '../../spinnners/Spinners';

const Overview = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { data: overviewResponseData, isLoading } =
    useGetDashboardOverviewQuery({
      community_id: user?.community.id as string,
      community_user_id: user?.id as string,
    });

  // Loading state - show spinner in a centered container
  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-center min-h-[200px]">
          <Spinners variant="default" size="xl" color="primary" />
        </div>
      </section>
    );
  }

  return (
    <div className="border border-[#E6E9EE] rounded-lg w-full h-full overflow-hidden">
      <div className="flex items-center justify-between w-full px-5 py-3 border-b border-[#E6E9EE] mb-3">
        <h2 className="font-opensans font-semibold text-base sm:text-lg">
          Overview
        </h2>
        <Button
          variant="primary"
          size="md"
          className="rounded-xl py-2.5"
          leftIcon={<FaRegCalendarMinus size={16} />}
          rightIcon={<MdOutlineKeyboardArrowDown size={20} />}
        >
          6 Months
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 p-5">
        <div className="border border-[#E6E9EE] rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200">
          <div className="border-l-5 border-[#365B85] rounded-lg p-4 h-full">
            <h2 className="text-[#AFAFAF] font-inter mb-2">Total visitors</h2>
            <p className="text-[#365B85] font-inter font-medium text-lg md:text-2xl">
              {overviewResponseData?.data.total_visitors ?? 0}
            </p>
          </div>
        </div>
        <div className="border border-[#E6E9EE] rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200">
          <div className="border-l-5 border-[#365B85] rounded-lg p-3 h-full">
            <h2 className="text-[#AFAFAF] font-inter mb-3">Active visitors</h2>
            <p className="text-[#365B85] font-inter font-medium text-lg md:text-2xl">
              {overviewResponseData?.data.active_visitors ?? 0}
            </p>
          </div>
        </div>
        <div className="border border-[#E6E9EE] rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200">
          <div className="border-l-5 border-[#365B85] rounded-lg p-3 h-full">
            <h2 className="text-[#AFAFAF] font-inter font-medium mb-3">
              Active Residents
            </h2>
            <p className="text-[#365B85] font-inter font-medium text-lg md:text-2xl">
              {overviewResponseData?.data.active_residents ?? 0}
            </p>
          </div>
        </div>
        <div className="border border-[#E6E9EE] rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200">
          <div className="border-l-5 border-[#365B85] rounded-lg p-3 h-full">
            <h2 className="text-[#AFAFAF] font-inter mb-3">
              Pending Residents
            </h2>
            <p className="text-[#365B85] font-inter font-medium text-lg md:text-2xl">
              {overviewResponseData?.data.pending_residents ?? 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
