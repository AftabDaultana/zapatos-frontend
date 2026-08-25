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
      cash: `PKR ${todaySale.toLocaleString()}`,
      card: "PKR 0",
      icon: Wallet,
      backgroundColor: "bg-blue-50",
    },
    {
      title: "Yesterday's Sale",
      total: `PKR ${yesterdaySale.toLocaleString()}`,
      cash: `PKR ${yesterdaySale.toLocaleString()}`,
      card: "PKR 0",
      icon: CalendarDays,
      backgroundColor: "bg-green-50",
    },
    {
      title: "Sale This Month",
      total: `PKR ${monthSale.toLocaleString()}`,
      cash: `PKR ${monthSale.toLocaleString()}`,
      card: "PKR 0",
      icon: CalendarRange,
      backgroundColor: "bg-yellow-50",
    },
    {
      title: "All Time Sale",
      total: `PKR ${allTimeSale.toLocaleString()}`,
      cash: `PKR ${allTimeSale.toLocaleString()}`,
      card: "PKR 0",
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
