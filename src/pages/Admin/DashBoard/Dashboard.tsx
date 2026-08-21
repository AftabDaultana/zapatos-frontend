import {
  CalendarDays,
  CalendarRange,
  CheckCircle,
  Clock,
  CreditCard,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import SalesOverviewCard from "../../../components/admin/SalesOverviewCard/SalesOverviewCard";
import OrderStatsCard from "../../../components/admin/OrderStatusCard/OrderStatsCard";
import DashboardActivity from "../../../components/admin/DashboardActivity/DashboardActivity";
import WeeklyActivityChart from "../../../components/admin/DashboardActivity/WeeklyActivityChart";
import BestSellingProducts from "../../../components/admin/DashboardActivity/BestSellingProducts";

const salesOverview = [
  {
    title: "Today's Sale",
    total: "PKR 500,000,000",
    cash: "PKR 300,000,000",
    card: "PKR 200,000,000",
    icon: Wallet,
    backgroundColor: "bg-blue-50",
  },
  {
    title: "Yesterday's Sale",
    total: "PKR 450,000,000",
    cash: "PKR 270,000,000",
    card: "PKR 180,000,000",
    icon: CalendarDays,
    backgroundColor: "bg-green-50",
  },
  {
    title: "Sale This Month",
    total: "PKR 8,500,000,000",
    cash: "PKR 5,100,000,000",
    card: "PKR 3,400,000,000",
    icon: CalendarRange,
    backgroundColor: "bg-yellow-50",
  },
  {
    title: "All Time Sale",
    total: "PKR 125,000,000,000",
    cash: "PKR 75,000,000,000",
    card: "PKR 50,000,000,000",
    icon: CreditCard,
    backgroundColor: "bg-purple-50",
  },
];

const orderStats = [
  {
    title: "Today's Orders",
    count: 125,
    icon: ShoppingBag,
  },
  {
    title: "Orders Pending",
    count: 32,
    icon: Clock,
  },
  {
    title: "Orders Delivered",
    count: 93,
    icon: CheckCircle,
  },
];

const weeklyActivity = [
  {
    day: "Mon",
    orders: 42,
    delivered: 32,
    cancelled: 3,
  },
  {
    day: "Tue",
    orders: 55,
    delivered: 41,
    cancelled: 4,
  },
  {
    day: "Wed",
    orders: 48,
    delivered: 36,
    cancelled: 2,
  },
  {
    day: "Thu",
    orders: 67,
    delivered: 52,
    cancelled: 5,
  },
  {
    day: "Fri",
    orders: 72,
    delivered: 58,
    cancelled: 4,
  },
  {
    day: "Sat",
    orders: 61,
    delivered: 49,
    cancelled: 3,
  },
  {
    day: "Sun",
    orders: 38,
    delivered: 30,
    cancelled: 2,
  },
];

export default function Dashboard() {
  return (
    <main className="p-6 flex flex-col gap-16">
      <section>
        <h2 className="text-xl mb-4 font-bold text-neutral-950">
          Dashboard Overview
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {salesOverview.map((sale) => (
            <SalesOverviewCard key={sale.title} {...sale} />
          ))}
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {orderStats.map((stat) => (
            <OrderStatsCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>
      <DashboardActivity>
        <WeeklyActivityChart data={weeklyActivity} />
        <BestSellingProducts />
      </DashboardActivity>
    </main>
  );
}
