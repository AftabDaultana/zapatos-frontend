import {
  Bar,
  BarChart,
  CartesianGrid,
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
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="orders" name="Orders" />
            <Bar dataKey="delivered" name="Delivered" />
            <Bar dataKey="cancelled" name="Cancelled" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
