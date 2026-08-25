import {
  Area,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectOrders } from "../../../app/selectors/orderSelectors";

interface MonthlyRevenueItem {
  year: number;
  month: string;
  revenue: number;
}

export default function MonthlyRevenueChart() {
  const orders = useAppSelector(selectOrders);
  const availableYears = [
    ...new Set(orders.map((order) => new Date(order.createdAt).getFullYear())),
  ].sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState(
    availableYears[0] ?? new Date().getFullYear(),
  );
  const monthlyData: MonthlyRevenueItem[] = Array.from(
    { length: 12 },
    (_, index) => {
      const month = new Date(selectedYear, index, 1).toLocaleString("en-US", {
        month: "short",
      });

      const revenue = orders
        .filter((order) => {
          const date = new Date(order.createdAt);

          return (
            date.getFullYear() === selectedYear &&
            date.getMonth() === index &&
            order.status !== "cancelled"
          );
        })
        .reduce((total, order) => total + order.total, 0);

      return {
        year: selectedYear,
        month,
        revenue,
      };
    },
  );
  return (
    <div>
      <div className="mb-6 flex h-10 items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-950">Monthly Revenue</h2>
        <select
          value={selectedYear}
          onChange={(event) => setSelectedYear(Number(event.target.value))}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 outline-none transition focus:border-neutral-300 focus:ring-2 focus:ring-[#16DBCC]/20"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="h-80 rounded-2xl bg-white p-4">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <AreaChart
            data={monthlyData}
            margin={{ top: 20, right: 20, left: 5, bottom: 20 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16DBCC" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#16DBCC" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#d4d4d4"
              strokeDasharray={"4 4"}
            />
            <XAxis
              dataKey={"month"}
              type="category"
              axisLine={false}
              tickLine={false}
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
              type={"monotone"}
              dataKey={"revenue"}
              stroke="#16DBCC"
              fill="url(#revenueGradient)"
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
