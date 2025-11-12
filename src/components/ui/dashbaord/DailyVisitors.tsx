import { useState } from 'react';
import SimpleBar from '../../charts/SimpleBarChart';
import { useAppSelector } from '../../../redux/app/hook';
import { useGetDashboardOverviewDailyVisitorQuery } from '../../../redux/features/dashboard/dashboardApi';
import { formatFullDate } from '../../../shared/helper/formatDate';
import Spinners from '../../spinnners/Spinners';
import { DatePicker } from '../date-picker/DatePicker';

const DailyVisitors = () => {
  // Start with current date instead of null
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const community = useAppSelector((state) => state.auth.user);

  const { data, isLoading } = useGetDashboardOverviewDailyVisitorQuery({
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

  return (
    <div className="border border-[#E6E9EE] rounded-lg w-[60%] h-full">
      {/* Header - Always visible */}
      <div className="w-full flex items-center justify-between px-5 py-3 border-b border-[#E6E9EE]">
        <div className="flex gap-2">
          <h2 className="font-opensans font-medium text-gray-900">
            Daily Visitors
          </h2>
          <p className="text-sm text-pry">({currentMonthYear})</p>
        </div>
        <DatePicker
          value={selectedDate}
          onChange={(date) => date && setSelectedDate(date)}
          placeholder="Choose a date"
          disabled={isLoading}
        />
      </div>
      {/* Content Area */}
      <div className="h-72 w-full p-5">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinners variant="default" size="xl" color="primary" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-pry-light mb-2">No visitor data available</p>
            <p className="text-pry text-sm">Try selecting a different month</p>
          </div>
        ) : (
          <SimpleBar pry="#31C65B" data={chartData} />
        )}
      </div>
    </div>
  );
};

export default DailyVisitors;
