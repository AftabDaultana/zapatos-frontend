import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SubCategoryCardProps {
  imageUrl: string;
  title: string;
  imageFit?: "cover" | "contain";
  isActive?: boolean;
  path?: string;
  variant?: "default" | "brand";
}
export default function SubCategoryCard({
  imageUrl,
  title,
  imageFit = "cover",
  isActive = false,
  path,
  variant = "default",
}: SubCategoryCardProps) {
  if (variant === "brand") {
    return (
      <section className="relative flex aspect-95/100 w-full flex-col overflow-hidden items-center bg-neutral-100">
        <div className="flex min-h-0 flex-1 items-center justify-center p-6">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="shrink-0 p-4">
          {path ? (
            <Link
              to={path}
              className={`flex w-fit items-center gap-2 border px-4 py-3 ${
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
              className={`flex w-fit items-center gap-2 border px-4 py-3 ${
                isActive
                  ? "border-neutral-950 bg-neutral-950 text-neutral-50"
                  : "border-neutral-950 bg-neutral-100 text-neutral-950"
              }`}
            >
              {title}
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </section>
    );
  }
  return (
    <section
      className={`relative aspect-95/100 w-full bg-center bg-no-repeat ${imageFit === "cover" ? "bg-cover" : " bg-contain"}`}
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
