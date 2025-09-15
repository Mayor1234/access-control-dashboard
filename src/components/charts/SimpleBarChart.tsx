import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { time: '0:00am', visitors: 65 },
  { time: '12:00am', visitors: 58 },
  { time: '1:00am', visitors: 110 },
  { time: '2:00am', visitors: 72 },
  { time: '4:00am', visitors: 65 },
  { time: '4:00am', visitors: 80 },
  { time: '5:00am', visitors: 45 },
  { time: '6:00am', visitors: 62 },
  { time: '7:00am', visitors: 92 },
  { time: '8:00am', visitors: 78 },
];

type ColorType = {
  pry: string;
};

const SimpleBar: React.FC<ColorType> = ({ pry }) => {
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
              dataKey="time"
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
              domain={[0, 120]}
              ticks={[0, 20, 40, 60, 80, 100, 120]}
            />
            <Bar
              dataKey="visitors"
              fill={pry}
              radius={[20, 20, 20, 20]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimpleBar;
