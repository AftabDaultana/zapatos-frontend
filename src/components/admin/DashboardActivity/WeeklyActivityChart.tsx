import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectOrders } from "../../../app/selectors/orderSelectors";

interface WeeklyActivity {
  day: string;
  orders: number;
  delivered: number;
  cancelled: number;
}

export default function WeeklyActivityChart() {
  const orders = useAppSelector(selectOrders);

  const today = new Date();

  const startOfWeek = new Date(today);
  const day = startOfWeek.getDay();

  // Monday as the first day of the week
  const mondayOffset = day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(startOfWeek.getDate() + mondayOffset);
  startOfWeek.setHours(0, 0, 0, 0);

  const weeklyActivity: WeeklyActivity[] = Array.from(
    { length: 7 },
    (_, index) => {
      const date = new Date(startOfWeek);

      date.setDate(startOfWeek.getDate() + index);

      return {
        day: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        orders: 0,
        delivered: 0,
        cancelled: 0,
      };
    },
  );

  orders.forEach((order) => {
    const orderDate = new Date(order.createdAt);

    if (
      orderDate >= startOfWeek &&
      orderDate < new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000)
    ) {
      const orderDay = orderDate.getDay();

      const index = orderDay === 0 ? 6 : orderDay - 1;

      weeklyActivity[index].orders += 1;

      if (order.status === "delivered") {
        weeklyActivity[index].delivered += 1;
      }

      if (order.status === "cancelled") {
        weeklyActivity[index].cancelled += 1;
      }
    }
  });

  return (
    <div className="p-5 xl:col-span-2">
      <h2 className="mb-6 text-xl font-bold text-neutral-950">
        Weekly Activity
      </h2>

      <div className="h-80 rounded-2xl bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyActivity} barGap={8} barCategoryGap="20%">
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
