import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import ProductReviewFormModal from "../../components/ui/productReview/ProductReviewFormModal";
import {
  getCurrentUserProductReviews,
  deleteProductReview,
  type ProductReview,
} from "../../services/productReviewServices";

export default function ProductReviews() {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ProductReview | null>(
    null,
  );

  const REVIEWS_PER_PAGE = 5;

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await getCurrentUserProductReviews(
        currentPage,
        REVIEWS_PER_PAGE,
      );

      setReviews(result.productReviews);
      setTotalPages(result.pagination.totalPages);
      setTotalReviews(result.pagination.totalProductReviews);
    } catch (error) {
      console.error("Failed to fetch product reviews:", error);
      setError("Unable to load product reviews.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchReviews();
  }, [currentPage]);

  const handleUpdate = (review: ProductReview) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product review?",
    );

    if (!confirmed) return;

    try {
      setIsDeleting(id);
      setError("");

      await deleteProductReview(id);

      if (reviews.length === 1 && currentPage > 1) {
        setCurrentPage((page) => page - 1);
      } else {
        await fetchReviews();
      }
    } catch (error) {
      console.error("Failed to delete product review:", error);
      setError("Unable to delete product review.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleModalClose = () => {
    setIsReviewModalOpen(false);
    setSelectedReview(null);
  };

  const handleModalSuccess = async () => {
    handleModalClose();
    await fetchReviews();
  };

  const startIndex =
    totalReviews === 0 ? 0 : (currentPage - 1) * REVIEWS_PER_PAGE + 1;

  const endIndex = Math.min(currentPage * REVIEWS_PER_PAGE, totalReviews);

  const getCustomerName = (review: ProductReview) => {
    return typeof review.customerId === "string"
      ? "Customer"
      : review.customerId.name;
  };

  const getProductName = (review: ProductReview) => {
    return typeof review.productId === "string"
      ? "Product"
      : review.productId.name;
  };

  const getStatusStyles = (status: ProductReview["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-extrabold text-neutral-950">
          My Product Reviews
        </h1>

        {error && (
          <p className="mb-4 text-center text-sm text-red-600">{error}</p>
        )}

        {isLoading ? (
          <p className="py-10 text-center text-sm text-neutral-500">
            Loading product reviews...
          </p>
        ) : reviews.length === 0 ? (
          <div className="border p-10 text-center">
            <h2 className="text-xl font-medium text-neutral-950">
              No product reviews found.
            </h2>
            <p className="mt-2 text-neutral-600">
              Your product reviews will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto border border-neutral-200">
              <table className="w-full min-w-225 text-left text-sm">
                <thead className="bg-neutral-100 text-neutral-700">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Customer</th>
                    <th className="px-4 py-4 font-semibold">Product</th>
                    <th className="px-4 py-4 font-semibold">Review</th>
                    <th className="px-4 py-4 font-semibold">Rating</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold">Date</th>
                    <th className="px-4 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-200">
                  {reviews.map((review) => (
                    <tr key={review._id} className="hover:bg-neutral-50">
                      <td className="px-4 py-4 text-neutral-950">
                        {getCustomerName(review)}
                      </td>

                      <td className="px-4 py-4 text-neutral-950">
                        {getProductName(review)}
                      </td>

                      <td className="max-w-xs px-4 py-4">
                        <p className="font-medium text-neutral-950">
                          {review.heading}
                        </p>
                        <p className="mt-1 line-clamp-2 text-neutral-500">
                          {review.content}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-neutral-950">
                        {review.rating}/5
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(
                            review.status,
                          )}`}
                        >
                          {review.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-neutral-600">
                        {new Date(review.createdAt).toLocaleDateString("en-PK")}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="none"
                            onClick={() => handleUpdate(review)}
                            className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
                            aria-label={`Update review ${review._id}`}
                            title="Update review"
                          >
                            <Pencil size={16} />
                          </Button>

                          <Button
                            type="button"
                            variant="none"
                            disabled={isDeleting === review._id}
                            onClick={() => void handleDelete(review._id)}
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={`Delete review ${review._id}`}
                            title="Delete review"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-neutral-500">
                  Showing{" "}
                  <span className="font-medium text-neutral-950">
                    {startIndex}
                  </span>{" "}
                  -{" "}
                  <span className="font-medium text-neutral-950">
                    {endIndex}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-neutral-950">
                    {totalReviews}
                  </span>
                </p>

                <div className="flex items-center justify-center gap-1">
                  <Button
                    type="button"
                    variant="none"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </Button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
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
                  ))}

                  <Button
                    type="button"
                    variant="none"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                    className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ProductReviewFormModal
        isOpen={isReviewModalOpen}
        productId={
          selectedReview
            ? typeof selectedReview.productId === "string"
              ? selectedReview.productId
              : selectedReview.productId._id
            : ""
        }
        review={selectedReview}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
      />
    </main>
  );
}
