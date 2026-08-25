import DashboardActivity from "../../../components/admin/DashboardActivity/DashboardActivity";
import WeeklyActivityChart from "../../../components/admin/DashboardActivity/WeeklyActivityChart";
import BestSellingProducts from "../../../components/admin/DashboardActivity/BestSellingProducts";
import RevenueCharts from "../../../components/admin/RevenueCharts/RevenueCharts";
import RecentOrders from "../../../components/admin/RecentOrders/RecentOrders";
import SalesOverview from "../../../components/admin/SalesOverview/SalesOverview";
import OrderStats from "../../../components/admin/OrderStats/OrderStats";

export default function Dashboard() {
  return (
    <main className="p-6 flex flex-col gap-16">
      <SalesOverview />
      <OrderStats />
      <DashboardActivity>
        <WeeklyActivityChart />
        <BestSellingProducts />
      </DashboardActivity>
      <RevenueCharts />
      <RecentOrders />
    </main>
  );
}
