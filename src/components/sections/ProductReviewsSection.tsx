import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

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

const REVIEWS_PER_PAGE = 6;

export default function ProductReviewsSection({
  productId,
}: ProductReviewsSectionProps) {
  const [reviews, setReviews] = useState<PopulatedProductReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [loadMoreError, setLoadMoreError] = useState("");
  const [hasMore, setHasMore] = useState(true);
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

  // Synchronous refs for pagination and request management
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const pageRef = useRef(1);
  const requestIdRef = useRef(0);
  const pendingScrollIndexRef = useRef<number | null>(null);

  const loadReviews = useCallback(
    async (pageToLoad: number, append: boolean = false): Promise<boolean> => {
      if (loadingRef.current) return false;

      loadingRef.current = true;
      const requestId = ++requestIdRef.current;

      if (append) {
        setIsLoadingMore(true);
        setLoadMoreError("");
      } else {
        setIsLoading(true);
        setError("");
      }

      try {
        const result = await getProductReviews(
          productId,
          pageToLoad,
          REVIEWS_PER_PAGE,
        );

        // Ignore outdated requests, such as requests for a previous product.
        if (requestId !== requestIdRef.current) return false;

        const populatedReviews = result.productReviews.filter(
          (review): review is PopulatedProductReview =>
            typeof review.customerId !== "string",
        );

        if (append) {
          setReviews((prev) => {
            const existingIds = new Set(prev.map((review) => review._id));

            const uniqueNewReviews = populatedReviews.filter(
              (review) => !existingIds.has(review._id),
            );

            return [...prev, ...uniqueNewReviews];
          });
        } else {
          setReviews(populatedReviews);
        }

        // Commit the page only after a successful response.
        pageRef.current = pageToLoad;

        const moreAvailable = result.productReviews.length === REVIEWS_PER_PAGE;

        hasMoreRef.current = moreAvailable;
        setHasMore(moreAvailable);

        return true;
      } catch (err) {
        if (requestId !== requestIdRef.current) return false;

        console.error("Failed to fetch product reviews:", err);

        if (append) {
          setLoadMoreError("Unable to load more reviews. Please try again.");
        } else {
          setError("Unable to load product reviews.");
        }

        return false;
      } finally {
        // An outdated request must not modify the current request's state.
        if (requestId === requestIdRef.current) {
          loadingRef.current = false;
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [productId],
  );

  // Reset and fetch reviews whenever the product changes.
  useEffect(() => {
    requestIdRef.current++;
    loadingRef.current = false;
    pageRef.current = 1;
    hasMoreRef.current = true;
    pendingScrollIndexRef.current = null;

    setReviews([]);
    setIsLoading(true);
    setIsLoadingMore(false);
    setError("");
    setLoadMoreError("");
    setHasMore(true);
    setCanScrollPrev(false);
    setCanScrollNext(false);

    loadReviews(1, false);

    return () => {
      // Invalidate any request that is still pending on unmount/product change.
      requestIdRef.current++;
      loadingRef.current = false;
    };
  }, [loadReviews]);

  // Reinitialize Embla when the number of slides changes.
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit();

    const pendingIndex = pendingScrollIndexRef.current;

    if (pendingIndex !== null) {
      const lastIndex = emblaApi.scrollSnapList().length - 1;

      if (lastIndex >= 0) {
        emblaApi.scrollTo(Math.min(pendingIndex, lastIndex));
      }

      pendingScrollIndexRef.current = null;
    } else if (reviews.length === 0) {
      emblaApi.scrollTo(0);
    }

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi, reviews.length]);

  const loadNextPage = useCallback(async () => {
    if (!hasMoreRef.current || loadingRef.current) return;

    const nextPage = pageRef.current + 1;

    // Move to the first newly loaded review after the request succeeds.
    pendingScrollIndexRef.current = emblaApi
      ? emblaApi.selectedScrollSnap() + 1
      : null;

    const success = await loadReviews(nextPage, true);

    if (!success) {
      pendingScrollIndexRef.current = null;
    }
  }, [emblaApi, loadReviews]);

  // Attach Embla navigation and automatic pagination listeners.
  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    const onSelect = () => {
      updateButtons();

      const lastIndex = emblaApi.scrollSnapList().length - 1;
      const currentIndex = emblaApi.selectedScrollSnap();

      if (
        currentIndex === lastIndex &&
        hasMoreRef.current &&
        !loadingRef.current
      ) {
        loadNextPage();
      }
    };

    updateButtons();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, loadNextPage]);

  const handleNextClick = () => {
    if (!emblaApi || loadingRef.current) return;

    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else if (hasMoreRef.current) {
      loadNextPage();
    }
  };

  const handleReviewSuccess = async () => {
    pageRef.current = 1;
    hasMoreRef.current = true;
    pendingScrollIndexRef.current = null;

    setHasMore(true);
    setLoadMoreError("");

    const success = await loadReviews(1, false);

    if (success) {
      emblaApi?.scrollTo(0);
    }
  };

  const isNextDisabled =
    (!canScrollNext && !hasMore) || isLoading || isLoadingMore;

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          Customer Reviews
        </h2>

        <p className="mt-2 text-sm text-neutral-500 sm:text-base">
          See what customers think about this product.
        </p>
      </div>

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
              disabled={!canScrollPrev}
              aria-label="Previous review"
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
              onClick={handleNextClick}
              disabled={isNextDisabled}
              aria-label="Next review"
              className="absolute right-0 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-30 sm:size-12"
            >
              {isLoadingMore ? (
                <Loader2 size={20} className="animate-spin sm:size-6" />
              ) : (
                <>
                  <ChevronRight size={20} className="sm:hidden" />
                  <ChevronRight size={24} className="hidden sm:block" />
                </>
              )}
            </button>

            {/* Pagination Error */}
            {loadMoreError && (
              <div className="mt-4 text-center">
                <p className="text-sm text-red-600">{loadMoreError}</p>

                <button
                  type="button"
                  onClick={loadNextPage}
                  disabled={isLoadingMore}
                  className="mt-2 text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 disabled:opacity-50"
                >
                  Try again
                </button>
              </div>
            )}
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
