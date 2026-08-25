import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectOrders } from "../../../app/selectors/orderSelectors";
import {
  selectCategories,
  selectProducts,
  selectSubCategories,
} from "../../../app/selectors/catalogSelectors";

interface CategorySales {
  category: string;
  percentage: number;
}

export default function BestSellingProducts() {
  const orders = useAppSelector(selectOrders);
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const subCategories = useAppSelector(selectSubCategories);

  const categorySales = orders
    .filter((order) => order.status !== "cancelled")
    .flatMap((order) => order.items)
    .reduce<Record<number, number>>((acc, item) => {
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        return acc;
      }

      product.subCategoryId.forEach((subCategoryId) => {
        const subCategory = subCategories.find(
          (subCategory) => subCategory.id === subCategoryId,
        );

        if (!subCategory) {
          return;
        }

        const categoryId = subCategory.categoryId;

        acc[categoryId] = (acc[categoryId] || 0) + item.quantity;
      });

      return acc;
    }, {});

  const totalCategorySales = Object.values(categorySales).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const bestSellingCategories: CategorySales[] = categories
    .map((category) => ({
      category: category.name,
      percentage:
        totalCategorySales > 0
          ? Math.round(
              ((categorySales[category.id] || 0) / totalCategorySales) * 100,
            )
          : 0,
    }))
    .filter((category) => category.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage);

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
