import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Checked-In Visitors', value: 4000, color: '#10B981' },
  { name: 'Checkout-Out Visitors', value: 303, color: '#F59E0B' },
];

const COLORS = ['#31C65B', '#F5D100'];

const PieChart = () => {
  return (
    <div className="flex items-center">
      {/* Chart Container */}
      <div className="flex-1 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-col space-y-6 ml-8">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-12 bg-[#31C65B] rounded"></div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Checked-In Visitors</p>
            <p className="text-xl font-inter font-bold text-[#101346]">4000</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-1 h-12 bg-[#F5D100] rounded"></div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Checkout-Out Visitors</p>
            <p className="text-xl font-inter font-bold text-[#101346]">303</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
