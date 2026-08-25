import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectOrders } from "../../../app/selectors/orderSelectors";

export default function AnnualRevenueChart() {
  const orders = useAppSelector(selectOrders);

  const annualRevenue = Object.entries(
    orders
      .filter((order) => order.status !== "cancelled")
      .reduce<Record<number, number>>((acc, order) => {
        const year = new Date(order.createdAt).getFullYear();

        acc[year] = (acc[year] || 0) + order.total;

        return acc;
      }, {}),
  )
    .map(([year, revenue]) => ({
      year: Number(year),
      revenue,
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <div>
      <div className="mb-6 flex h-10 items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-950">Annual Revenue</h2>
      </div>

      <div className="h-80 rounded-2xl bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={annualRevenue}
            margin={{ top: 20, right: 20, left: 5, bottom: 20 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              stroke="#d4d4d4"
            />

            <XAxis
              dataKey="year"
              type="category"
              axisLine={false}
              tickLine={false}
              tickMargin={16}
              interval={0}
              tick={{ fontSize: 10 }}
            />

            <YAxis
              width={75}
              axisLine={false}
              tickLine={false}
              tickMargin={16}
              interval={0}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) =>
                value === 0 ? "PKR 0" : `PKR ${value / 1000}K`
              }
            />

            <Tooltip
              formatter={(value) => [`PKR ${Number(value) / 1000}k`, "revenue"]}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#16DBCC"
              fill="none"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
