import { bestSellingProducts } from "../../../data/bestSellingProducts";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function BestSellingProducts() {
  return (
    <div className="p-5">
      <h2 className="mb-6 text-xl font-bold text-neutral-950">
        Best Selling Products
      </h2>

      <div className="h-80 rounded-2xl bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={bestSellingProducts}
              dataKey="percentage"
              nameKey="category"
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
