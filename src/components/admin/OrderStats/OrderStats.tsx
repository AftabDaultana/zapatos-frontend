import { CheckCircle, Clock, ShoppingBag } from "lucide-react";
import OrderStatsCard from "./OrderStatsCard";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectOrderStats } from "../../../app/selectors/dashboardSelectors";

export default function OrderStats() {
  const { todayOrders, pendingOrders, deliveredOrders } =
    useAppSelector(selectOrderStats);

  const orderStats = [
    {
      title: "Today's Orders",
      count: todayOrders,
      icon: ShoppingBag,
    },
    {
      title: "Orders Pending",
      count: pendingOrders,
      icon: Clock,
    },
    {
      title: "Orders Delivered",
      count: deliveredOrders,
      icon: CheckCircle,
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {orderStats.map((stat) => (
          <OrderStatsCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  );
}
