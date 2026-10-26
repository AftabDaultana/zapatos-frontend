import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductReviewCard from "../ui/productReview/ProductReviewCard";
import { getProductReviews } from "../../services/productReviewServices";
import type { ProductReview } from "../../services/productReviewServices";
import ProductReviewFormModal from "../ui/productReview/ProductReviewFormModal";
import Button from "../ui/Button";
import { useAppSelector } from "../../hooks/reduxHooks";

interface ProductReviewsSectionProps {
  productId: string;
}

interface PopulatedProductReview extends Omit<ProductReview, "customerId"> {
  customerId: {
    _id: string;
    name: string;
  };
}

export default function ProductReviewsSection({
  productId,
}: ProductReviewsSectionProps) {
  const [reviews, setReviews] = useState<PopulatedProductReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const curretnUser = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError("");

        const result = await getProductReviews(productId, page, 6);

        setReviews(
          result.productReviews.filter(
            (review): review is PopulatedProductReview =>
              typeof review.customerId !== "string",
          ),
        );
        setTotalPages(result.pagination.totalPages);
      } catch {
        console.error("Failed to fetch product reviews:", error);
        setError("Unable to load product reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId, page]);

  return (
    <section className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-center text-neutral-950">
            Customer Reviews
          </h2>
          <p className="mt-2 text-sm text-center text-neutral-500">
            See what customers think about this product.
          </p>
        </div>

        {reviews.length > 0 && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1 || isLoading}
              aria-label="Previous reviews"
              className="rounded-full border border-neutral-200 p-2 text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={page === totalPages || isLoading}
              aria-label="Next reviews"
              className="rounded-full border border-neutral-200 p-2 text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <p className="text-sm text-center text-neutral-500">
          Loading reviews...
        </p>
      ) : error ? (
        <p className="text-sm text-center text-red-600">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="rounded-xl border border-neutral-200 p-6 text-sm text-center text-neutral-500">
          No reviews for this product yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <ProductReviewCard
              key={review._id}
              customerName={review.customerId.name}
              heading={review.heading}
              content={review.content}
              rating={review.rating}
              createdAt={review.createdAt}
            />
          ))}
        </div>
      )}
      {curretnUser && (
        <div>
          <Button
            type="button"
            variant="dark"
            onClick={() => setIsReviewModalOpen(true)}
            className="px-5 py-3 text-sm font-medium"
          >
            Add Review
          </Button>
        </div>
      )}
      <ProductReviewFormModal
        isOpen={isReviewModalOpen}
        productId={productId}
        onClose={() => setIsReviewModalOpen(false)}
        onSuccess={async () => {
          setPage(1);

          const result = await getProductReviews(productId, 1, 6);

          setReviews(
            result.productReviews.filter(
              (review): review is PopulatedProductReview =>
                typeof review.customerId !== "string",
            ),
          );

          setTotalPages(result.pagination.totalPages);
        }}
      />
    </section>
  );
}
