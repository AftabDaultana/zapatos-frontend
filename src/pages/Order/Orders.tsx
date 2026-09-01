import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectOrdersByUserId } from "../../app/selectors/orderSelectors";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function Orders() {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [currentPage, setCurrentPage] = useState(1);

  const ORDERS_PER_PAGE = 5;

  const orders = useAppSelector((state) =>
    currentUser ? selectOrdersByUserId(state, currentUser.id) : undefined,
  );

  const totalOrders = orders?.length ?? 0;
  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);

  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;

  const currentOrders = orders?.slice(startIndex, startIndex + ORDERS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (!currentUser) {
    return (
      <main className="px-6 py-18">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-2xl font-semibold text-neutral-950">
            Please login to view your orders
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-18">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-8 text-3xl font-extrabold text-center text-neutral-950">
          My Orders
        </h1>
        {totalOrders === 0 ? (
          <div className="border p-10 text-center">
            <h2 className="text-xl font-medium text-neutral-950">
              You haven't placed any orders yet.
            </h2>

            <p className="mt-2 text-neutral-600">
              Your orders will appear here after you complete a purchase.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentOrders!.map((order) => (
                <div key={order.id} className="border p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-neutral-950">{order.id}</p>
                      <p className="mt-1 text-sm text-neutral-950">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">Total</p>
                      <p className="font-medium text-neutral-950">
                        PKR {order.total.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">Status</p>
                      <p className="font-medium text-neutral-950">
                        {order.status}
                      </p>
                    </div>

                    <Link
                      to={`/order/${order.id}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className="border border-neutral-950 px-5 py-3 text-center text-sm font-medium text-neutral-950 transition hover:bg-neutral-950 hover:text-neutral-50"
                    >
                      View Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-neutral-500">
                  Showing{" "}
                  <span className="font-medium text-neutral-950">
                    {startIndex + 1}
                  </span>{" "}
                  -{" "}
                  <span className="font-medium text-neutral-950">
                    {Math.min(startIndex + ORDERS_PER_PAGE, totalOrders)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-neutral-950">
                    {totalOrders}
                  </span>
                </p>
                <div className="mt-8 flex items-center justify-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                        currentPage === page
                          ? "bg-[#16DBCC] text-white"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                    className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
