import { ArrowRight } from "lucide-react";
import BannerCard from "../ui/BannerCard";
import banner1 from "../../assets/men.jpg?format=webp";
import sneakers from "../../assets/sneakers.jpg?format=webp";
import highTops from "../../assets/high-tops.jpg?format=webp";
import performanceShoes from "../../assets/performance-shoes.jpg?format=webp";
import { useNavigate } from "react-router-dom";

export default function TrendingTablet() {
  const navigate = useNavigate();
  return (
    <div className="hidden xl:hidden md:flex flex-col gap-4">
      <div className="relative grid grid-cols-1 gap-4">
        <BannerCard
          title="Chunky Dad Sneakers"
          titleClassName="text-2xl text-[#364b4c] leading-8 font-bold"
          description="Bold, retro, and comfy"
          descriptionClassName="w-full text-right text-lg text-[#364b4c] leading-7"
          contentContainerClassName="absolute top-13 right-[5%] flex flex-col gap-11 items-center"
          textContainerClassName="flex flex-col"
          image={banner1}
          cardClassName="w-full h-100 overflow-hidden relative group"
          overlayClassName="bg-[#EDEDED]/20"
          buttonContainerClassName="absolute top-[35%] right-[5%]"
          buttonClassName="bg-neutral-950 text-neutral-50 w-[141px] h-11 text-lg font-medium gap-1.5"
          buttonText="SEE MORE"
          buttonIcon={<ArrowRight size={16} />}
          onButtonClick={() => {
            window.scrollTo(0, 0);
            navigate("/category/men/casual-sneakers");
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4 relative group">
          <BannerCard
            title="Performance Running Shoes"
            titleClassName="text-2xl text-neutral-100 leading-8 font-bold"
            contentContainerClassName="absolute top-12 left-12 w-42.5 flex flex-col gap-11 items-center"
            textContainerClassName="flex flex-col"
            image={performanceShoes}
            cardClassName="hidden md:block w-full h-100 overflow-hidden relative group"
            overlayClassName="bg-[#EDEDED]/20"
            buttonContainerClassName="absolute bottom-12 left-1/2 -translate-x-1/2"
            buttonClassName="bg-neutral-950 text-neutral-50 w-[141px] h-11 text-lg font-medium gap-1.5"
            buttonText="SEE MORE"
            buttonIcon={<ArrowRight size={16} />}
            onButtonClick={() => {
              window.scrollTo(0, 0);
              navigate("/category/men/athletic-shoes");
            }}
          />
          <BannerCard
            title="Sustainable Sneakers"
            titleClassName="text-2xl text-neutral-100 leading-8 font-bold"
            contentContainerClassName="absolute top-12 left-12 w-42.5 flex flex-col gap-11 items-center"
            textContainerClassName="flex flex-col"
            image={sneakers}
            cardClassName="hidden md:block w-full h-100 overflow-hidden relative group"
            overlayClassName="bg-[#EDEDED]/20"
            buttonContainerClassName="absolute bottom-12 left-1/2 -translate-x-1/2"
            buttonClassName="bg-neutral-950 text-neutral-50 w-[141px] h-11 text-lg font-medium gap-1.5"
            buttonText="SEE MORE"
            buttonIcon={<ArrowRight size={16} />}
            onButtonClick={() => {
              window.scrollTo(0, 0);
              navigate("/sustainable");
            }}
          />
          <BannerCard
            title="High-Tops for Streetwear Looks"
            titleClassName="text-2xl text-neutral-100 leading-8 font-bold"
            contentContainerClassName="absolute top-12 left-12 w-42.5 flex flex-col gap-11 items-center"
            textContainerClassName="flex flex-col"
            image={highTops}
            cardClassName="hidden md:block w-full h-100 overflow-hidden relative group"
            overlayClassName="bg-[#EDEDED]/20"
            buttonContainerClassName="absolute bottom-12 left-1/2 -translate-x-1/2"
            buttonClassName="bg-neutral-950 text-neutral-50 w-[141px] h-11 text-lg font-medium gap-1.5"
            buttonText="SEE MORE"
            buttonIcon={<ArrowRight size={16} />}
            onButtonClick={() => {
              window.scrollTo(0, 0);
              navigate("/high-tops");
            }}
          />
        </div>
      </div>
    </div>
  );
}
