import BannerCard from "../ui/BannerCard";
import banner1 from "../../assets/men.jpg";
import { ArrowRight } from "lucide-react";

export default function TrendingSection() {
  return (
    <div>
      <section className="flex flex-col px-4 md:px-6 xl:px-8">
        <div className="flex flex-col gap-12">
          <div className="h-9 items-center">
            <h4 className="text-3xl leading-9 text-neutral-950 font-bold text-center">
              TRENDING SNEAKER STYLE
            </h4>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative grid grid-cols-2 md:grid-cols-1 gap-4">
              <BannerCard
                title="Chunky Dad Sneakers"
                image={banner1}
                cardClassName="w-full h-[613px] overflow-hidden relative group"
                contentContainerClassName="absolute top-0 right-0 py-10.5 px-10.5"
                buttonText="SEE MORE"
                buttonIcon={<ArrowRight />}
              />
              <BannerCard
                title="Performance Running Shoes"
                image={banner1}
                cardClassName="md:hidden w-full h-[613px] overflow-hidden relative group"
                buttonText="SEE MORE"
                buttonIcon={<ArrowRight />}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <BannerCard
                title="Performance Running Shoes"
                image={banner1}
                cardClassName="hidden md:block w-full h-[613px] overflow-hidden relative group"
                buttonText="SEE MORE"
                buttonIcon={<ArrowRight />}
              />
              <BannerCard
                title="Sustainable Sneakers"
                image={banner1}
                cardClassName="w-full h-[613px] overflow-hidden relative group"
                buttonText="SEE MORE"
                buttonIcon={<ArrowRight />}
              />
              <BannerCard
                title="High-Tops for Streetwear Looks"
                image={banner1}
                cardClassName="w-full h-[613px] overflow-hidden relative group"
                buttonText="SEE MORE"
                buttonIcon={<ArrowRight />}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
