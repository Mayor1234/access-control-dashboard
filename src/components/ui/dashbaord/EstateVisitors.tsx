import { FaRegCalendarMinus } from 'react-icons/fa6';
import PieChart from '../../charts/PieChart';
import { Button } from '../button/Button';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useGetDashboardOverviewVisitorPieQuery } from '../../../redux/features/dashboard/dashboardApi';
import { useAppSelector } from '../../../redux/app/hook';
import Spinners from '../../spinnners/Spinners';

const EstateVisitors = () => {
  const community = useAppSelector((state) => state.auth.user);

  const { data, isLoading } = useGetDashboardOverviewVisitorPieQuery({
    community_id: community?.community.id as string,
    community_user_id: community?.id as string,
  });

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No visitor data available
      </div>
    );
  }

  return (
    <div className="border border-[#E6E9EE] rounded-lg w-[40%] h-full">
      <div className="w-full flex items-center justify-between px-5 py-3 border-b  border-[#E6E9EE] pb-3">
        <h2 className="font-opensans font-medium">Estate Visitors</h2>
        <Button
          variant="outline"
          size="md"
          className="rounded-xl py-2"
          leftIcon={<FaRegCalendarMinus size={16} />}
          rightIcon={<MdOutlineKeyboardArrowDown size={20} />}
        >
          6 Month
        </Button>
      </div>
      <div className="h-72 w-full p-5">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinners variant="default" size="xl" color="primary" />
          </div>
        ) : (
          <PieChart pieData={data?.data} />
        )}
      </div>
    </div>
  );
};

export default EstateVisitors;
