import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type ColorType = {
  data: { date: string; visitors: number }[];
  pry: string;
};

const SimpleBar: React.FC<ColorType> = ({ data, pry }) => {
  return (
    <div className="w-full h-full text-xs">
      {/* Chart Container */}
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            barCategoryGap="20%"
          >
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: '#9CA3AF',
                fontWeight: 400,
              }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: '#9CA3AF',
                fontWeight: 400,
              }}
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <Bar
              dataKey="visitors"
              fill={pry}
              radius={[20, 20, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimpleBar;
