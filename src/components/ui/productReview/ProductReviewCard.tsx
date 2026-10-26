import { Star } from "lucide-react";

interface ProductReviewCardProps {
  customerName: string;
  heading: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
}

export default function ProductReviewCard({
  customerName,
  heading,
  content,
  rating,
  createdAt,
}: ProductReviewCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="flex h-full min-w-0 flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-neutral-950">
            {heading}
          </h3>

          <p className="mt-1 text-sm text-neutral-500">By {customerName}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < rating
                  ? "fill-amber-400 text-amber-400"
                  : "text-neutral-300"
              }
            />
          ))}
        </div>
      </div>

      <p className="flex-1 whitespace-pre-line wrap-break-word text-sm leading-6 text-neutral-600">
        {content}
      </p>

      <p className="border-t border-neutral-100 pt-3 text-xs text-neutral-400">
        {formattedDate}
      </p>
    </article>
  );
}
