import OrdersTable from "../AdminOrders/OrdersTable";

export default function RecentOrders() {
  return <OrdersTable ordersPerPage={5} />;
}
