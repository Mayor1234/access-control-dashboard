import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip,
} from 'recharts';
import type { DashboardOverviewVisitorPie } from '../../redux/features/dashboard/residentTypes';

interface Props {
  pieData?: DashboardOverviewVisitorPie;
}

interface ChartDataItem {
  name: string;
  value: number;
  color?: string;
}

const PieChart: React.FC<Props> = ({ pieData }) => {
  const checkedIn = pieData?.checked_in_visitors ?? 0;
  const checkedOut = pieData?.checked_out_visitors ?? 0;
  const totalVisitors = checkedIn + checkedOut;

  const data: ChartDataItem[] = [
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

  // Display empty state data if no visitors
  const displayData: ChartDataItem[] =
    totalVisitors === 0 ? [{ name: 'No Data', value: 1 }] : data;

  const displayColors = totalVisitors === 0 ? ['#E5E7EB'] : COLORS;

  const calculatePercentage = (value: number): number => {
    if (totalVisitors === 0) return 0;
    return Math.round((value / totalVisitors) * 100);
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length && totalVisitors > 0) {
      const data = payload[0];
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            {data.value} visitors ({calculatePercentage(data.value)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col justify-center md:flex-row items-center md:items-center w-full h-full gap-8 md:gap-12">
      {/* Chart Container */}
      <div className="w-full md:flex-1 h-56 sm:h-64 lg:h-72 relative">
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
              strokeWidth={0}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {displayData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={displayColors[index % displayColors.length]}
                  className={totalVisitors > 0 ? 'cursor-pointer' : ''}
                />
              ))}
              {totalVisitors > 0 && (
                <Label
                  value={totalVisitors.toLocaleString()}
                  position="center"
                  className="text-3xl font-bold"
                  fill="#101346"
                />
              )}
            </Pie>
            {totalVisitors > 0 && <Tooltip content={<CustomTooltip />} />}
          </RechartsPieChart>
        </ResponsiveContainer>

        {/* Empty State Overlay */}
        {totalVisitors === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-300">0</p>
              <p className="text-xs text-gray-400 mt-1">No visitors yet</p>
            </div>
          </div>
        )}
      </div>

      {/* Legend with Metrics */}
      <div className="w-full md:w-auto flex flex-row justify-center items-center gap-10 md:flex-col md:gap-6">
        {/* Checked-In Visitors */}
        <div
          className={`w-full flex items-center space-x-3 transition-opacity duration-200 ${
            totalVisitors === 0 ? 'opacity-40' : ''
          }`}
        >
          <div
            className={`w-1 h-12 rounded transition-colors ${
              totalVisitors === 0 ? 'bg-pry-light' : 'bg-[#31C65B]'
            }`}
            aria-hidden="true"
          />
          <div>
            <p className="text-xs text-pry-light mb-1 uppercase tracking-wide">
              Checked-In
            </p>
            <div className="flex items-baseline gap-2">
              <p
                className={`text-lg sm:text-xl lg:text-2xl font-semibold transition-colors ${
                  totalVisitors === 0 ? 'text-pry-light' : 'text-[#101346]'
                }`}
              >
                {checkedIn.toLocaleString()}
              </p>
              {totalVisitors > 0 && (
                <span className="text-xs text-gray-400 font-medium">
                  {calculatePercentage(checkedIn)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Checked-Out Visitors */}
        <div
          className={`w-full flex items-center space-x-3 transition-opacity duration-200 ${
            totalVisitors === 0 ? 'opacity-40' : ''
          }`}
        >
          <div
            className={`w-1 h-12 rounded transition-colors ${
              totalVisitors === 0 ? 'bg-pry-light' : 'bg-[#F5D100]'
            }`}
            aria-hidden="true"
          />
          <div>
            <p className="text-xs text-pry-light mb-1 uppercase tracking-wide">
              Checked-Out
            </p>
            <div className="flex items-baseline gap-2">
              <p
                className={`text-lg sm:text-xl lg:text-2xl font-semibold transition-colors ${
                  totalVisitors === 0 ? 'text-pry-light' : 'text-[#101346]'
                }`}
              >
                {checkedOut.toLocaleString()}
              </p>
              {totalVisitors > 0 && (
                <span className="text-xs text-gray-400 font-medium">
                  {calculatePercentage(checkedOut)}%
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
