import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchAllOrders } from "../../../app/slices/orderSlice";
import type { Order } from "../../../types/order";
import OrdersTable from "../AdminOrders/OrdersTable";

export default function RecentOrders() {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.order.pagination);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | Order["status"]>("all");

  useEffect(() => {
    dispatch(
      fetchAllOrders({
        page,
        limit: 5,
        search,
        ...(status !== "all" && { status }),
      }),
    );
  }, [dispatch, page, search, status]);

  return (
    <OrdersTable
      ordersPerPage={5}
      title="Recent Orders"
      page={page}
      setPage={setPage}
      search={search}
      setSearch={setSearch}
      status={status}
      setStatus={setStatus}
      totalPages={pagination.totalPages}
      totalOrders={pagination.totalOrders}
    />
  );
}
