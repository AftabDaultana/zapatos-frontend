import BannerCard from "../ui/BannerCard";
import men from "../../assets/men.jpg?format=webp";
import kids from "../../assets/kids.jpg?format=webp";
import women from "../../assets/women.jpg?format=webp";
import sports from "../../assets/sports.jpg?format=webp";
import brands from "../../assets/brands.jpg?format=webp";
import sandals from "../../assets/sandals.jpg?format=webp";
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
      <BannerCard
        image={men}
        buttonText="Men"
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
      <BannerCard
        image={kids}
        buttonText="Kids"
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
      <BannerCard
        image={women}
        buttonText="Women"
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
      <BannerCard
        image={sports}
        buttonText="Sports"
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
      <BannerCard
        image={brands}
        buttonText="Brands"
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
      <BannerCard
        image={sandals}
        buttonText="Sandals"
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        cardClassName={cardClasses.cardClassName}
        overlayClassName={cardClasses.overlayClassName}
        buttonContainerClassName={cardClasses.buttonContainerClassName}
        buttonClassName={cardClasses.buttonClassName}
      />
    </div>
  );
}
