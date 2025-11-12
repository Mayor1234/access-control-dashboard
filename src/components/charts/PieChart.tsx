import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
} from 'recharts';
import type { DashboardOverviewVisitorPie } from '../../redux/features/dashboard/residentTypes';

interface Props {
  pieData?: DashboardOverviewVisitorPie;
}

const PieChart: React.FC<Props> = ({ pieData }) => {
  const checkedIn = pieData?.checked_in_visitors || 0;
  const checkedOut = pieData?.checked_out_visitors || 0;
  const totalVisitors = checkedIn + checkedOut;

  const data = [
    {
      name: 'Checked-In Visitors',
      value: checkedIn,
      color: '#31C65B',
    },
    {
      name: 'Checked-Out Visitors',
      value: checkedOut,
      color: '#F5D100',
    },
  ];

  const COLORS = ['#31C65B', '#F5D100'];

  const displayData =
    totalVisitors === 0 ? [{ name: 'No Data', value: 1 }] : data;

  const displayColors = totalVisitors === 0 ? ['#E5E7EB'] : COLORS;

  const calculatePercentage = (value: number) => {
    if (totalVisitors === 0) return 0;
    return Math.round((value / totalVisitors) * 100);
  };

  return (
    <div className="flex items-center">
      {/* Chart Container */}
      <div className="flex-1 h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              startAngle={90}
              endAngle={450}
              paddingAngle={totalVisitors === 0 ? 0 : 5}
              dataKey="value"
            >
              {displayData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={displayColors[index % displayColors.length]}
                />
              ))}
              {totalVisitors > 0 && (
                <Label
                  value={totalVisitors}
                  position="center"
                  className="text-3xl font-bold"
                  fill="#101346"
                />
              )}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>

        {totalVisitors === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-300">0</p>
              <p className="text-xs text-gray-400 mt-1">No visitors</p>
            </div>
          </div>
        )}
      </div>

      {/* Legend with percentages */}
      <div className="flex flex-col space-y-6 ml-8">
        <div
          className={`flex items-center space-x-3 ${
            totalVisitors === 0 ? 'opacity-40' : ''
          }`}
        >
          <div
            className={`w-1 h-12 rounded ${
              totalVisitors === 0 ? 'bg-gray-200' : 'bg-[#31C65B]'
            }`}
          />
          <div>
            <p className="text-sm text-gray-500 mb-1">Checked-In Visitors</p>
            <div className="flex items-baseline gap-2">
              <p
                className={`text-xl font-inter font-bold ${
                  totalVisitors === 0 ? 'text-gray-300' : 'text-[#101346]'
                }`}
              >
                {checkedIn}
              </p>
              {totalVisitors > 0 && (
                <span className="text-sm text-gray-400">
                  ({calculatePercentage(checkedIn)}%)
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          className={`flex items-center space-x-3 ${
            totalVisitors === 0 ? 'opacity-50' : ''
          }`}
        >
          <div
            className={`w-1 h-12 rounded ${
              totalVisitors === 0 ? 'bg-gray-200' : 'bg-[#F5D100]'
            }`}
          />
          <div>
            <p className="text-sm text-gray-500 mb-1">Checked-Out Visitors</p>
            <div className="flex items-baseline gap-2">
              <p
                className={`text-xl font-inter font-bold ${
                  totalVisitors === 0 ? 'text-gray-300' : 'text-[#101346]'
                }`}
              >
                {checkedOut}
              </p>
              {totalVisitors > 0 && (
                <span className="text-sm text-gray-400">
                  ({calculatePercentage(checkedOut)}%)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
