import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WeeklyActivity {
  day: string;
  orders: number;
  delivered: number;
  cancelled: number;
}

interface WeeklyActivityChartProps {
  data: WeeklyActivity[];
}

export default function WeeklyActivityChart({
  data,
}: WeeklyActivityChartProps) {
  return (
    <div className="p-5 xl:col-span-2">
      <h2 className="mb-6 text-xl font-bold text-neutral-950">
        Weekly Activity
      </h2>

      <div className="h-80 rounded-2xl bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8} barCategoryGap="20%">
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="delivered"
              name="Delivered"
              fill="#737373"
              barSize={12}
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="orders"
              name="Orders"
              fill="#171717"
              barSize={12}
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="cancelled"
              name="Cancelled"
              fill="#749191"
              barSize={12}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
