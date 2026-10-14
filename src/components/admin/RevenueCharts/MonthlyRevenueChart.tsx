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
import { fetchMonthlyRevenue } from "../../../app/slices/analyticsSlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";

export default function MonthlyRevenueChart() {
  const currentYear = new Date().getFullYear();
  const dispatch = useAppDispatch();

  const monthlyData = useAppSelector((state) => state.analytics.monthlyRevenue);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const availableYears = [
    ...new Set([
      currentYear,
      ...useAppSelector((state) => state.analytics.annualRevenue).map(
        (item) => item.year,
      ),
    ]),
  ].sort((a, b) => b - a);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    dispatch(fetchMonthlyRevenue(year));
  };

  return (
    <div>
      <div className="mb-6 flex h-10 items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-950">Monthly Revenue</h2>
        <select
          value={selectedYear}
          onChange={(event) => handleYearChange(Number(event.target.value))}
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
