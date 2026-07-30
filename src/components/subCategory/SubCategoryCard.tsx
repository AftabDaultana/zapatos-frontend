import { ArrowRight } from "lucide-react";

interface subCategoryCardProps {
  imageUrl: string;
  title: string;
  imageFit?: "cover" | "contain";
}
export default function SubCategoryCard({
  imageUrl,
  title,
  imageFit = "cover",
}: subCategoryCardProps) {
  return (
    <section
      className={`relative h-100 w-95 bg-center bg-no-repeat ${imageFit === "cover" ? "bg-cover" : " bg-contain"}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <button className="absolute bottom-4 left-4 flex items-center gap-2 bg-neutral-100 px-4 py-3 text-neutral-950 border border-neutral-950">
        {title}
        <ArrowRight size={20} />
      </button>
    </section>
  );
}
