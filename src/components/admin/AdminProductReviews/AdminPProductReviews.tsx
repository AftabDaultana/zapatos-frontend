import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "../../ui/Button";

import {
  getAllProductReviews,
  updateProductReviewStatus,
  type ProductReview,
} from "../../../services/productReviewServices";

type PaginationPage = number | "...";

const REVIEWS_PER_PAGE = 10;

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

export default function AdminProductReviews() {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);

      const result = await getAllProductReviews(
        currentPage,
        REVIEWS_PER_PAGE,
        debouncedSearchTerm,
        selectedStatus !== "all"
          ? (selectedStatus as "unapproved" | "approved" | "rejected")
          : undefined,
      );

      setReviews(result.productReviews);
      setTotalReviews(result.pagination.totalProductReviews);
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch product reviews:", error);
      setReviews([]);
      setTotalReviews(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const [updatingReviewId, setUpdatingReviewId] = useState<string | null>(null);

  const handleStatusUpdate = async (
    reviewId: string,
    status: "unapproved" | "approved" | "rejected",
  ) => {
    try {
      setUpdatingReviewId(reviewId);

      await updateProductReviewStatus(reviewId, status);

      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId ? { ...review, status } : review,
        ),
      );
    } catch (error) {
      console.error("Failed to update review status:", error);
    } finally {
      setUpdatingReviewId(null);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage, debouncedSearchTerm, selectedStatus]);

  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const paginationPages = getPaginationPages(currentPage, totalPages);

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  return (
    <main className="flex flex-col gap-8 p-6">
      <div>
        <h2 className="text-lg font-bold text-neutral-950">Product Reviews</h2>
      </div>

      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <select
          value={selectedStatus}
          onChange={(event) => handleStatusFilter(event.target.value)}
          className="w-fit rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 outline-none"
        >
          <option value="all">All Reviews</option>
          <option value="unapproved">Unapproved</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <div className="flex flex-1 items-center lg:max-w-xl">
          <div className="flex w-full items-center overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <input
              type="text"
              placeholder="Search customer name"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="min-w-0 flex-1 px-4 py-2 text-sm text-neutral-950 outline-none placeholder:text-neutral-400"
            />

            <Button
              type="button"
              variant="none"
              aria-label="Search reviews"
              className="px-4 py-2 text-neutral-500"
            >
              <Search size={22} />
            </Button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-275">
            <thead>
              <tr className="border-b border-neutral-300 text-left">
                {[
                  "Customer",
                  "Product",
                  "Review",
                  "Rating",
                  "Status",
                  "Date",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4 text-sm font-semibold text-neutral-600"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-neutral-500"
                  >
                    Loading reviews...
                  </td>
                </tr>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <tr
                    key={review._id}
                    className="border-b border-neutral-300 last:border-b-0"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-neutral-950">
                      {typeof review.customerId === "string"
                        ? "Customer"
                        : review.customerId.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {typeof review.productId === "string"
                        ? "Product"
                        : review.productId.name}
                    </td>

                    <td className="max-w-xs px-6 py-4">
                      <p className="text-sm font-medium text-neutral-950">
                        {review.heading}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-neutral-500">
                        {review.content}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {review.rating}/5
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {review.status === "approved" ? (
                          <>
                            <Button
                              type="button"
                              variant="none"
                              disabled={updatingReviewId === review._id}
                              onClick={() =>
                                handleStatusUpdate(review._id, "unapproved")
                              }
                              className="rounded-lg bg-amber-100 px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-200 disabled:opacity-50"
                            >
                              Unapprove
                            </Button>

                            <Button
                              type="button"
                              variant="none"
                              disabled={updatingReviewId === review._id}
                              onClick={() =>
                                handleStatusUpdate(review._id, "rejected")
                              }
                              className="rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
                            >
                              Reject
                            </Button>
                          </>
                        ) : review.status === "rejected" ? (
                          <>
                            <Button
                              type="button"
                              variant="none"
                              disabled={updatingReviewId === review._id}
                              onClick={() =>
                                handleStatusUpdate(review._id, "approved")
                              }
                              className="rounded-lg bg-green-100 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-200 disabled:opacity-50"
                            >
                              Approve
                            </Button>

                            <Button
                              type="button"
                              variant="none"
                              disabled={updatingReviewId === review._id}
                              onClick={() =>
                                handleStatusUpdate(review._id, "unapproved")
                              }
                              className="rounded-lg bg-amber-100 px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-200 disabled:opacity-50"
                            >
                              Unapprove
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              type="button"
                              variant="none"
                              disabled={updatingReviewId === review._id}
                              onClick={() =>
                                handleStatusUpdate(review._id, "approved")
                              }
                              className="rounded-lg bg-green-100 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-200 disabled:opacity-50"
                            >
                              Approve
                            </Button>

                            <Button
                              type="button"
                              variant="none"
                              disabled={updatingReviewId === review._id}
                              onClick={() =>
                                handleStatusUpdate(review._id, "rejected")
                              }
                              className="rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {new Date(review.createdAt).toLocaleDateString("en-PK")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-neutral-500"
                  >
                    No product reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-4">
            <p className="text-sm text-neutral-500">
              Showing{" "}
              <span className="font-medium text-neutral-950">
                {totalReviews === 0 ? 0 : startIndex + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium text-neutral-950">
                {Math.min(startIndex + REVIEWS_PER_PAGE, totalReviews)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-neutral-950">
                {totalReviews}
              </span>
            </p>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                disabled={currentPage === 1 || totalPages === 0}
                variant="none"
                onClick={() => setCurrentPage(currentPage - 1)}
                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </Button>

              {paginationPages.map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 py-2 text-sm text-neutral-400"
                  >
                    ...
                  </span>
                ) : (
                  <Button
                    key={page}
                    type="button"
                    variant="none"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium ${
                      currentPage === page
                        ? "bg-[#16DBCC] text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {page}
                  </Button>
                ),
              )}

              <Button
                type="button"
                disabled={currentPage === totalPages || totalPages === 0}
                variant="none"
                onClick={() => setCurrentPage(currentPage + 1)}
                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40"
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
