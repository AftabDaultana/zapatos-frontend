import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductReviewCard from "../ui/productReview/ProductReviewCard";
import {
  getProductReviews,
  type ProductReview,
} from "../../services/productReviewServices";
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
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    loop: false,
    slidesToScroll: 1,
  });

  const currentUser = useAppSelector((state) => state.user.currentUser);

  // 1. Extracted Data Fetching Logic
  const loadReviews = useCallback(
    async (pageToLoad: number) => {
      try {
        setIsLoading(true);
        setError("");

        const result = await getProductReviews(productId, pageToLoad, 6);

        const populatedReviews = result.productReviews.filter(
          (review): review is PopulatedProductReview =>
            typeof review.customerId !== "string",
        );

        setReviews(populatedReviews);
      } catch (err) {
        console.error("Failed to fetch product reviews:", err);
        setError("Unable to load product reviews.");
      } finally {
        setIsLoading(false);
      }
    },
    [productId],
  );

  // Initial & Page Change Fetch
  useEffect(() => {
    loadReviews(page);
  }, [loadReviews, page]);

  // Update carousel when reviews change
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit();
    emblaApi.scrollTo(0);

    const updateNavigation = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    updateNavigation();

    emblaApi.on("select", updateNavigation);
    emblaApi.on("reInit", updateNavigation);

    return () => {
      emblaApi.off("select", updateNavigation);
      emblaApi.off("reInit", updateNavigation);
    };
  }, [emblaApi, reviews]);

  // 2. Simplified Success Handler
  const handleReviewSuccess = async () => {
    setPage(1);
    // Force fetch page 1 to ensure the new review appears immediately
    await loadReviews(1);
  };

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-12 sm:px-6">
      {/* Centered Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          Customer Reviews
        </h2>
        <p className="mt-2 text-sm text-neutral-500 sm:text-base">
          See what customers think about this product.
        </p>
      </div>

      {/* Review Carousel Area */}
      <div className="w-full">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-neutral-100 bg-neutral-50/50">
            <p className="text-sm font-medium text-neutral-500">
              Loading reviews...
            </p>
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-red-100 bg-red-50/50">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-6 text-center">
            <p className="text-neutral-500">No reviews for this product yet.</p>
            <p className="mt-1 text-sm text-neutral-400">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="relative mx-auto w-full max-w-2xl px-10 sm:px-16">
            {/* Previous Arrow */}
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev || isLoading}
              aria-label="Previous review"
              aria-hidden={!canScrollPrev || isLoading}
              className="absolute left-0 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-30 sm:size-12"
            >
              <ChevronLeft size={20} className="sm:hidden" />
              <ChevronLeft size={24} className="hidden sm:block" />
            </button>

            {/* Embla Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex touch-pan-y">
                {reviews.map((review) => (
                  <div key={review._id} className="min-w-0 flex-[0_0_100%]">
                    <ProductReviewCard
                      customerName={review.customerId.name}
                      heading={review.heading}
                      content={review.content}
                      rating={review.rating}
                      createdAt={review.createdAt}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext || isLoading}
              aria-label="Next review"
              aria-hidden={!canScrollNext || isLoading}
              className="absolute right-0 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-30 sm:size-12"
            >
              <ChevronRight size={20} className="sm:hidden" />
              <ChevronRight size={24} className="hidden sm:block" />
            </button>
          </div>
        )}
      </div>

      {/* Add Review Button */}
      {currentUser && (
        <div className="mt-10">
          <Button
            type="button"
            variant="dark"
            onClick={() => setIsReviewModalOpen(true)}
            className="rounded-full px-8 py-3 text-sm font-medium shadow-sm transition-transform hover:scale-105 hover:shadow-md"
          >
            Add Review
          </Button>
        </div>
      )}

      {/* Review Form Modal */}
      <ProductReviewFormModal
        isOpen={isReviewModalOpen}
        productId={productId}
        onClose={() => setIsReviewModalOpen(false)}
        onSuccess={handleReviewSuccess}
      />
    </section>
  );
}
