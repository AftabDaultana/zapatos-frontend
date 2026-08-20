import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  return Array.from({ length: 5 }).map((_, index) => {
    const starValue = index + 1;

    if (rating >= starValue) {
      return (
        <Star
          key={index}
          size={16}
          className="fill-neutral-950 text-neutral-950"
        />
      );
    }

    if (rating >= starValue - 0.5) {
      return (
        <span key={index} className="relative inline-block w-4 h-4">
          <Star size={16} className="absolute text-neutral-950" />
          <span className="absolute left-0 right-0 w-1/2 overflow-hidden">
            <Star size={16} className="fill-neutral-950 text-neutral-950" />
          </span>
        </span>
      );
    }
    return <Star key={index} size={16} className="text-neutral-950" />;
  });
}
