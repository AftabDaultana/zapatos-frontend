import { ArrowRight } from "lucide-react";
import BannerCard from "../ui/BannerCard";
import banner1 from "../../assets/men.jpg?format=webp";
import sneakers from "../../assets/sneakers.jpg?format=webp";
import highTops from "../../assets/high-tops.jpg?format=webp";
import performanceShoes from "../../assets/performance-shoes.jpg?format=webp";
import { useNavigate } from "react-router-dom";

export default function TrendingMobile() {
  const navigate = useNavigate();
  return (
    <div className="md:hidden flex flex-col gap-4">
      <div className="relative group grid grid-cols-2 gap-4">
        <BannerCard
          image={banner1}
          cardClassName="w-full h-40 overflow-hidden relative group"
          overlayClassName="bg-[#EDEDED]/20"
          buttonContainerClassName="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4.5"
          buttonClassName="bg-neutral-950 text-neutral-50 w-[131px] h-8 text-md leading-7 font-medium gap-1.5"
          buttonText="SEE MORE"
          buttonIcon={<ArrowRight size={16} />}
          onButtonClick={() => {
            window.scrollTo(0, 0);
            navigate("/category/men/casual-sneakers");
          }}
        />
        <BannerCard
          image={performanceShoes}
          cardClassName="block md:hidden w-full h-40 overflow-hidden relative group"
          overlayClassName="bg-[#EDEDED]/20"
          buttonContainerClassName="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4.5"
          buttonClassName="bg-neutral-950 text-neutral-50 w-[131px] h-8 text-md leading-7 font-medium gap-1.5"
          buttonText="SEE MORE"
          buttonIcon={<ArrowRight size={16} />}
          onButtonClick={() => {
            window.scrollTo(0, 0);
            navigate("/category/men/athletic-shoes");
          }}
        />
        <BannerCard
          image={sneakers}
          cardClassName="block md:hidden w-full h-40 overflow-hidden relative group"
          overlayClassName="bg-[#EDEDED]/20"
          buttonContainerClassName="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4.5"
          buttonClassName="bg-neutral-950 text-neutral-50 w-[131px] h-8 text-md leading-7 font-medium gap-1.5"
          buttonText="SEE MORE"
          buttonIcon={<ArrowRight size={16} />}
          onButtonClick={() => {
            window.scrollTo(0, 0);
            navigate("/sustainable");
          }}
        />
        <BannerCard
          image={highTops}
          cardClassName="block md:hidden w-full h-40 overflow-hidden relative group"
          overlayClassName="bg-[#EDEDED]/20"
          buttonContainerClassName="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4.5"
          buttonClassName="bg-neutral-950 text-neutral-50 w-[131px] h-8 text-md leading-7 font-medium gap-1.5"
          buttonText="SEE MORE"
          buttonIcon={<ArrowRight size={16} />}
          onButtonClick={() => {
            window.scrollTo(0, 0);
            navigate("/high-tops");
          }}
        />
      </div>
    </div>
  );
}
