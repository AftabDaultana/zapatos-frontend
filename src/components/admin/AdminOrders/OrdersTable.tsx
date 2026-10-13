import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { selectOrders } from "../../../app/selectors/orderSelectors";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { updateOrderStatusThunk } from "../../../app/slices/orderSlice";
import type { Order } from "../../../types/order";
import Button from "../../ui/Button";

type PaginationPage = number | "...";

interface OrdersTableProps {
  ordersPerPage?: number;
  title?: string;
  onlyCurrentUser?: boolean;
  page: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
  status: "all" | Order["status"];
  setStatus: (status: "all" | Order["status"]) => void;
  totalPages: number;
  totalOrders: number;
}

const statusStyles: Record<Order["status"], string> = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-indigo-50 text-indigo-700",
  processing: "bg-blue-50 text-blue-700",
  shipped: "bg-purple-50 text-purple-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

const statusOptions: Order["status"][] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const getPaginationPages = (
  currentPage: number,
  totalPages: number,
): PaginationPage[] => {
  if (totalPages <= 0) return [];

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export default function OrdersTable({
  ordersPerPage = 10,
  title = "Recent Orders",
  onlyCurrentUser = false,
  page,
  setPage,
  search,
  setSearch,
  status,
  setStatus,
  totalPages: totalPagesProp,
  totalOrders: totalOrdersProp,
}: OrdersTableProps) {
  const orders = useAppSelector(selectOrders);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const ordersSectionRef = useRef<HTMLDivElement>(null);

  // The backend now handles searching, filtering, sorting, and pagination.
  const visibleOrders = useMemo(() => {
    if (!onlyCurrentUser) return orders;

    return orders.filter((order) => order.userId === currentUser?._id);
  }, [orders, onlyCurrentUser, currentUser?._id]);

  const totalPages = totalPagesProp;
  const totalOrders = totalOrdersProp;
  const paginationPages = getPaginationPages(page, totalPages);
  const startIndex = (page - 1) * ordersPerPage;

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;

    setPage(nextPage);

    requestAnimationFrame(() => {
      ordersSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as "all" | Order["status"]);
    setPage(1);
  };

  const handleOrderStatusChange = (
    orderId: string,
    nextStatus: Order["status"],
  ) => {
    dispatch(updateOrderStatusThunk({ orderId, status: nextStatus }));
  };

  return (
    <div
      ref={ordersSectionRef}
      className="w-full rounded-xl border border-gray-200 bg-white"
    >
      <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {totalOrders} {totalOrders === 1 ? "order" : "orders"} found
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search orders..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm outline-none focus:border-gray-500 sm:w-64"
            />
          </div>

          <select
            value={status}
            onChange={(event) => handleStatusChange(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
          >
            <option value="all">All statuses</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-225 text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-4 font-medium">Order ID</th>
              <th className="px-5 py-4 font-medium">Date</th>
              <th className="px-5 py-4 font-medium">Customer</th>
              <th className="px-5 py-4 font-medium">Payment</th>
              <th className="px-5 py-4 font-medium">Amount</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {visibleOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              visibleOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900">
                    #{order._id.slice(-8).toUpperCase()}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">
                      {order.customer.name}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {order.customer.email}
                    </div>
                  </td>

                  <td className="px-5 py-4 capitalize text-gray-600">
                    Cash On Delivery
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">
                    Rs. {order.total.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      onChange={(event) =>
                        handleOrderStatusChange(
                          order._id,
                          event.target.value as Order["status"],
                        )
                      }
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium outline-none ${
                        statusStyles[order.status]
                      }`}
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Showing {totalOrders === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + ordersPerPage, totalOrders)} of {totalOrders}
        </p>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
            className="p-2"
          >
            <ChevronLeft size={18} />
          </Button>

          {paginationPages.map((paginationPage, index) =>
            paginationPage === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                key={paginationPage}
                type="button"
                onClick={() => handlePageChange(paginationPage)}
                className={`min-w-9 rounded-lg px-3 py-2 text-sm ${
                  page === paginationPage
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {paginationPage}
              </button>
            ),
          )}

          <Button
            type="button"
            disabled={totalPages === 0 || page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="p-2"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
