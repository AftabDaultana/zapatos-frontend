import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SubCategoryCardProps {
  imageUrl: string;
  title: string;
  imageFit?: "cover" | "contain";
  isActive?: boolean;
  path?: string;
}
export default function SubCategoryCard({
  imageUrl,
  title,
  imageFit = "cover",
  isActive = false,
  path,
}: SubCategoryCardProps) {
  return (
    <section
      className={`relative h-100 w-95 bg-center bg-no-repeat ${imageFit === "cover" ? "bg-cover" : " bg-contain"}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {path ? (
        <Link
          to={path}
          className={`absolute bottom-4 left-4 flex items-center gap-2 border px-4 py-3 ${
            isActive
              ? "border-neutral-950 bg-neutral-950 text-neutral-50"
              : "border-neutral-950 bg-neutral-100 text-neutral-950"
          }`}
        >
          {title}
          <ArrowRight size={20} />
        </Link>
      ) : (
        <button
          type="button"
          className={`absolute bottom-4 left-4 flex items-center gap-2 border px-4 py-3 ${
            isActive
              ? "border-neutral-950 bg-neutral-950 text-neutral-50"
              : "border-neutral-950 bg-neutral-100 text-neutral-950"
          }`}
        >
          {title}
          <ArrowRight size={20} />
        </button>
      )}
    </section>
  );
}
