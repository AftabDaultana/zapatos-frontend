import { CalendarDays, CalendarRange, CreditCard, Wallet } from "lucide-react";
import SalesOverviewCard from "./SalesOverviewCard";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectSalesOverview } from "../../../app/selectors/dashboardSelectors";

export default function SalesOverview() {
  const { todaySale, yesterdaySale, monthSale, allTimeSale } =
    useAppSelector(selectSalesOverview);

  const salesOverview = [
    {
      title: "Today's Sale",
      total: `PKR ${todaySale.toLocaleString()}`,
      icon: Wallet,
      backgroundColor: "bg-blue-50",
    },
    {
      title: "Yesterday's Sale",
      total: `PKR ${yesterdaySale.toLocaleString()}`,
      icon: CalendarDays,
      backgroundColor: "bg-green-50",
    },
    {
      title: "Sale This Month",
      total: `PKR ${monthSale.toLocaleString()}`,
      icon: CalendarRange,
      backgroundColor: "bg-yellow-50",
    },
    {
      title: "All Time Sale",
      total: `PKR ${allTimeSale.toLocaleString()}`,
      icon: CreditCard,
      backgroundColor: "bg-purple-50",
    },
  ];

  return (
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
  );
}
