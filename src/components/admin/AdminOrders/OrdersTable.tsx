import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

import { selectOrders } from "../../../app/selectors/orderSelectors";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { updateOrderStatus } from "../../../app/slices/orderSlice";
import type { Order } from "../../../types/order";
import Button from "../../ui/Button";

type PaginationPage = number | "...";

interface OrdersTableProps {
  ordersPerPage?: number;
  title?: string;
  onlyCurrentUser?: boolean;
}

const getPaginationPages = (
  currentPage: number,
  totalPages: number,
): PaginationPage[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
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

const statusStyles = {
  pending: "bg-yellow-50 text-yellow-700",
  processing: "bg-blue-50 text-blue-700",
  shipped: "bg-purple-50 text-purple-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function OrdersTable({
  ordersPerPage = 5,
  title = "Recent Orders",
  onlyCurrentUser = false,
}: OrdersTableProps) {
  const orders = useAppSelector(selectOrders);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<"all" | Order["status"]>(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const ordersSectionRef = useRef<HTMLDivElement>(null);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesCurrentUser =
        !onlyCurrentUser || order.userId === currentUser?.id;

      const matchesStatus =
        selectedStatus === "all" || order.status === selectedStatus;

      const matchesSearch =
        !normalizedQuery ||
        order.id.toLowerCase().includes(normalizedQuery) ||
        order.customer.name.toLowerCase().includes(normalizedQuery) ||
        order.customer.email.toLowerCase().includes(normalizedQuery) ||
        order.customer.phoneNumber.toLowerCase().includes(normalizedQuery);

      return matchesCurrentUser && matchesStatus && matchesSearch;
    });
  }, [orders, currentUser, onlyCurrentUser, selectedStatus, searchQuery]);

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [filteredOrders]);

  const totalOrders = sortedOrders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  const paginationPages = getPaginationPages(currentPage, totalPages);

  const startIndex = (currentPage - 1) * ordersPerPage;

  const currentOrders = sortedOrders.slice(
    startIndex,
    startIndex + ordersPerPage,
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    requestAnimationFrame(() => {
      ordersSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  };

  return (
    <section ref={ordersSectionRef}>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold text-neutral-950">{title}</h2>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search orders..."
              className="w-full rounded-lg border border-neutral-300 py-2.5 pl-10 pr-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 sm:w-64"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(event) => {
              setSelectedStatus(event.target.value as "all" | Order["status"]);
              setCurrentPage(1);
            }}
            className="border border-neutral-950 px-2 py-1 text-xs font-medium uppercase outline-none"
          >
            <option value="all">All Orders ({filteredOrders.length})</option>

            <option value="pending">
              Pending (
              {
                filteredOrders.filter((order) => order.status === "pending")
                  .length
              }
              )
            </option>

            <option value="processing">
              Processing (
              {
                filteredOrders.filter((order) => order.status === "processing")
                  .length
              }
              )
            </option>

            <option value="shipped">
              Shipped (
              {
                filteredOrders.filter((order) => order.status === "shipped")
                  .length
              }
              )
            </option>

            <option value="delivered">
              Delivered (
              {
                filteredOrders.filter((order) => order.status === "delivered")
                  .length
              }
              )
            </option>

            <option value="cancelled">
              Cancelled (
              {
                filteredOrders.filter((order) => order.status === "cancelled")
                  .length
              }
              )
            </option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-neutral-100 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-neutral-500">
                  Order ID
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-500">
                  Order Time
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-500">
                  Method
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-500">
                  Amount
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-500">
                  Status
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-neutral-100 last:border-b-0"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="text-sm font-medium text-neutral-950 hover:underline"
                      >
                        {order.id}
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {new Date(order.createdAt).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-neutral-950">
                      {order.customer.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      Cash on Delivery
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-neutral-950">
                      PKR {order.total.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <select
                          value={order.status}
                          onChange={(event) =>
                            dispatch(
                              updateOrderStatus({
                                orderId: order.id,
                                status: event.target.value as Order["status"],
                              }),
                            )
                          }
                          className="border border-neutral-950 px-2 py-1 text-xs font-medium uppercase outline-none"
                        >
                          <option value="pending">PENDING</option>
                          <option value="processing">PROCESSING</option>
                          <option value="shipped">SHIPPED</option>
                          <option value="delivered">DELIVERED</option>
                          <option value="cancelled">CANCELLED</option>
                        </select>

                        <Link
                          to={`/admin/orders/${order.id}`}
                          aria-label={`View order ${order.id}`}
                          className="text-neutral-500 transition hover:text-neutral-950"
                        >
                          <Search size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-neutral-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-neutral-300 px-6 py-4">
            <p className="text-sm text-neutral-500">
              Showing{" "}
              <span className="font-medium text-neutral-500">
                {totalOrders === 0 ? 0 : startIndex + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium text-neutral-500">
                {Math.min(startIndex + ordersPerPage, totalOrders)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-neutral-500">
                {totalOrders}
              </span>
            </p>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft size={16} />
              </Button>

              {paginationPages.map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 py-2 text-sm text-neutral-400"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <Button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-[#16DBCC] text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {page}
                  </Button>
                );
              })}

              <Button
                type="button"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
