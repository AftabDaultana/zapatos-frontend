import AnnualRevenueChart from "./AnnualRevenueChart";
import MonthlyRevenueChart from "./MonthlyRevenueChart";

export default function RevenueCharts() {
  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <AnnualRevenueChart />
      <MonthlyRevenueChart />
    </section>
  );
}
