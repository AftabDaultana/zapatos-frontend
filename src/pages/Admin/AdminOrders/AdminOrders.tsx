import { useSearchParams } from "react-router-dom";
import OrdersTable from "../../../components/admin/AdminOrders/OrdersTable";

export default function AdminOrders() {
  const [searchParams] = useSearchParams();

  const onlyCurrentUser = searchParams.get("mine") === "true";
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-950">Orders</h1>

        <p className="mt-1 text-sm text-neutral-500">
          View and manage all customer orders.
        </p>
      </div>

      <OrdersTable
        ordersPerPage={10}
        title="Orders"
        onlyCurrentUser={onlyCurrentUser}
      />
    </div>
  );
}
