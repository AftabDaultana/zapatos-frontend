import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllOrders } from "../../../app/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import type { Order } from "../../../types/order";
import OrdersTable from "../../../components/admin/AdminOrders/OrdersTable";

export default function AdminOrders() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<"all" | Order["status"]>("all");

  const pagination = useAppSelector((state) => state.order.pagination);

  // Debounce search input by 400ms.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset pagination when the debounced search changes.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // Fetch orders using the debounced search value.
  useEffect(() => {
    dispatch(
      fetchAllOrders({
        page,
        limit: 10,
        search: debouncedSearch,
        ...(status !== "all" && { status }),
      }),
    );
  }, [dispatch, page, debouncedSearch, status]);

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
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        totalPages={pagination.totalPages}
        totalOrders={pagination.totalOrders}
      />
    </div>
  );
}
