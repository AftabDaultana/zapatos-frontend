import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";

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
      <section className="group relative flex aspect-95/100 w-full flex-col items-center overflow-hidden bg-neutral-100">
        <div className="absolute inset-0 z-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center p-6">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="absolute bottom-4 left-4 z-10">
          {path ? (
            <Link
              to={path}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
                isActive
                  ? "border border-neutral-950 bg-neutral-950 text-neutral-50"
                  : "border border-neutral-950 bg-neutral-100 text-neutral-950 transition-all duration-200 hover:bg-neutral-950 hover:text-neutral-50"
              }`}
            >
              {title}
              <ArrowRight size={20} />
            </Link>
          ) : (
            <Button
              type="button"
              variant={isActive ? "dark" : "light"}
              className="gap-2 px-4 py-3"
            >
              {title}
              <ArrowRight size={20} />
            </Button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`group relative aspect-95/100 w-full bg-center bg-no-repeat ${
        imageFit === "cover" ? "bg-cover" : "bg-contain"
      }`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {path ? (
        <Link
          to={path}
          className={`absolute bottom-4 left-4 z-10 flex items-center gap-2 px-4 py-3 rounded-lg ${
            isActive
              ? "border border-neutral-950 bg-neutral-950 text-neutral-50"
              : "border border-neutral-950 bg-neutral-100 text-neutral-950 transition-all duration-200 hover:bg-neutral-950 hover:text-neutral-50"
          }`}
        >
          {title}
          <ArrowRight size={20} />
        </Link>
      ) : (
        <Button
          type="button"
          variant={isActive ? "dark" : "light"}
          className="absolute bottom-4 left-4 z-10 gap-2 px-4 py-3"
        >
          {title}
          <ArrowRight size={20} />
        </Button>
      )}
    </section>
  );
}
