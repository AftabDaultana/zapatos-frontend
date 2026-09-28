import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchAllCarts } from "../../../app/slices/cartSlice";
import Button from "../../ui/Button";

type PaginationPage = number | "...";

const CARTS_PER_PAGE = 10;

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

export default function AdminCarts() {
  const dispatch = useAppDispatch();

  const { adminCarts, pagination, loading, error } = useAppSelector(
    (state) => state.cart,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const totalCarts = pagination?.totalCarts ?? 0;
  const totalPages = pagination?.totalPages ?? 0;

  useEffect(() => {
    dispatch(
      fetchAllCarts({
        page: currentPage,
        limit: CARTS_PER_PAGE,
      }),
    );
  }, [dispatch, currentPage]);

  const startIndex = (currentPage - 1) * CARTS_PER_PAGE;
  const paginationPages = getPaginationPages(currentPage, totalPages);

  return (
    <main className="flex flex-col gap-8 p-6">
      <div>
        <h2 className="text-lg font-bold text-neutral-950">Carts List</h2>
      </div>

      <section className="overflow-hidden rounded-2xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-neutral-300 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Cart ID
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Customer
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Products
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Items
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-neutral-500"
                  >
                    Loading carts...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-red-600"
                  >
                    {error}
                  </td>
                </tr>
              ) : adminCarts.length > 0 ? (
                adminCarts.map((cart) => (
                  <tr
                    key={cart._id}
                    className="border-b border-neutral-300 last:border-b-0"
                  >
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {cart._id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-neutral-950">
                          {cart.userId.name}
                        </p>

                        <p className="text-xs text-neutral-500">
                          {cart.userId.phoneNumber}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-3">
                        {cart.items.map((item, index) => {
                          const product = item.productId;

                          if (!product) return null;

                          return (
                            <div
                              key={`${product._id}-${item.color}-${item.size}-${index}`}
                              className="flex items-center gap-3"
                            >
                              <img
                                src={product.images?.[0]}
                                alt={product.name}
                                className="h-12 w-12 rounded-lg bg-neutral-100 object-contain"
                              />

                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium text-neutral-950">
                                  {product.name}
                                </p>

                                <p className="text-xs text-neutral-500">
                                  Color: {item.color} | Size: {item.size}
                                </p>

                                <p className="text-xs text-neutral-600">
                                  PKR {product.discountedPrice.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {cart.items.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-neutral-500"
                  >
                    No carts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-4">
            <p className="text-sm text-neutral-500">
              Showing{" "}
              <span className="font-medium text-neutral-950">
                {totalCarts === 0 ? 0 : startIndex + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium text-neutral-950">
                {Math.min(startIndex + CARTS_PER_PAGE, totalCarts)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-neutral-950">{totalCarts}</span>
            </p>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                disabled={currentPage === 1 || totalPages === 0}
                variant="none"
                onClick={() => setCurrentPage((page) => page - 1)}
                className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
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
                    variant="none"
                    onClick={() => setCurrentPage(page)}
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
                variant="none"
                onClick={() => setCurrentPage((page) => page + 1)}
                className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
