import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "../../../hooks/reduxHooks";

interface CategorySales {
  name: string;
  count: number;
  percentage: number;
}

export default function BestSellingProducts() {
  const categories = useAppSelector(
    (state) => state.analytics.bestSellingCategories,
  );

  const bestSellingCategories: CategorySales[] = categories.map((category) => ({
    name: category.name,
    count: category.count,
    percentage: category.percentage,
  }));

  return (
    <div className="p-5">
      <h2 className="mb-6 text-xl font-bold text-neutral-950">
        Best Selling Products
      </h2>

      <div className="h-80 rounded-2xl bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={bestSellingCategories}
              dataKey="percentage"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              paddingAngle={2}
              label={({ value }) => `${value}%`}
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
