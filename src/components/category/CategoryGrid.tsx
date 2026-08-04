import CategoryCard from "./CategoryCard";
import men from "../../assets/men.jpg";
import kids from "../../assets/kids.jpg";
import women from "../../assets/women.jpg";
import sports from "../../assets/sports.jpg";
import brands from "../../assets/brands.jpg";
import sandals from "../../assets/sandals.jpg";
import { ArrowRight } from "lucide-react";

const cardClasses = {
  cardClassName:
    "w-full aspect-[165.5/160] md:aspect-[251.33/240] xl:aspect-[551.33/376] overflow-hidden relative group",
  overlayClassName: "bg-[#ECECEC]/10",
  buttonContainerClassName:
    "absolute left-1/2 -translate-x-1/2 md:left-0 md:-translate-x-0 bottom-0 p-6",
  buttonClassName: "px-4 py-3 gap-1.5 bg-white text-neutral-950",
};

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 xl:gap-6 justify-center">
      <CategoryCard
        title="Men"
        image={men}
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
      <CategoryCard
        title="Kids"
        image={kids}
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
      <CategoryCard
        title="Women"
        image={women}
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
      <CategoryCard
        title="Sports"
        image={sports}
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
      <CategoryCard
        title="Brands"
        image={brands}
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
      <CategoryCard
        title="Sandals"
        image={sandals}
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
    </div>
  );
}
