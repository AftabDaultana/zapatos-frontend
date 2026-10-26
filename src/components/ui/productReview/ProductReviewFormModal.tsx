import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import Button from "../Button";
import type { ProductReview } from "../../../services/productReviewServices";
import {
  createProductReview,
  updateProductReview,
} from "../../../services/productReviewServices";

interface ProductReviewFormModalProps {
  isOpen: boolean;
  productId: string;
  review?: ProductReview | null;
  onClose: () => void;
  onSuccess: () => void | Promise<void>;
}

interface ReviewFormData {
  heading: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export default function ProductReviewFormModal({
  isOpen,
  productId,
  review,
  onClose,
  onSuccess,
}: ProductReviewFormModalProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    heading: "",
    content: "",
    rating: 5,
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(review);

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      heading: review?.heading ?? "",
      content: review?.content ?? "",
      rating: review?.rating ?? 5,
    });

    setFormErrors([]);
    setIsSubmitting(false);
  }, [isOpen, review]);

  if (!isOpen) return null;

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.heading.trim()) {
      errors.push("Review title is required.");
    }

    if (!formData.content.trim()) {
      errors.push("Review content is required.");
    }

    if (![1, 2, 3, 4, 5].includes(formData.rating)) {
      errors.push("Please select a rating.");
    }

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm();

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors([]);

    try {
      const data = {
        heading: formData.heading.trim(),
        content: formData.content.trim(),
        rating: formData.rating,
      };

      if (review) {
        await updateProductReview(review._id, data);
      } else {
        await createProductReview(productId, data);
      }

      await onSuccess();
      onClose();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to save the review. Please try again.";

      setFormErrors([message]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-review-form-title"
    >
      <div className="max-h-full w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div>
            <h2
              id="product-review-form-title"
              className="text-xl font-semibold text-neutral-950"
            >
              {isEditing ? "Edit Review" : "Write a Review"}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {isEditing
                ? "Update your product review."
                : "Share your experience with this product."}
            </p>
          </div>

          <Button
            type="button"
            onClick={onClose}
            aria-label="Close review form"
            variant="none"
            className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6">
          {formErrors.length > 0 && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              <ul className="list-inside list-disc space-y-1">
                {formErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label
              htmlFor="review-heading"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              Review Title
            </label>

            <input
              id="review-heading"
              type="text"
              value={formData.heading}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  heading: event.target.value,
                }))
              }
              placeholder="Summarize your experience"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-950">
              Your Rating
            </label>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="none"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      rating: value as ReviewFormData["rating"],
                    }))
                  }
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                  aria-pressed={formData.rating === value}
                  className="rounded p-1"
                >
                  <Star
                    size={28}
                    className={
                      value <= formData.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-neutral-300"
                    }
                  />
                </Button>
              ))}

              <span className="ml-2 text-sm text-neutral-500">
                {formData.rating}/5
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="review-content"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              Review
            </label>

            <textarea
              id="review-content"
              rows={6}
              value={formData.content}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  content: event.target.value,
                }))
              }
              placeholder="Tell others about your experience..."
              className="w-full resize-y rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            />
          </div>

          <div className="mt-2 flex justify-end gap-3 border-t border-neutral-200 pt-5">
            <Button
              type="button"
              onClick={onClose}
              variant="light"
              disabled={isSubmitting}
              className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-medium transition"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="dark"
              disabled={isSubmitting}
              className="px-5 py-3 text-sm font-medium"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Submit Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
