import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import ProductSlider from "../sliders/ProductSlider";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col px-4 md:px-6 xl:px-8 gap-8 md:gap-12 items-center">
      <div className="flex flex-col gap-3 items-center">
        <h4 className="text-3xl leading-9 font-bold">HAPPENING NOW!</h4>
        <Button
          type="button"
          variant="none"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/featured");
          }}
          className="h-10 gap-1.5 py-3 text-lg leading-7 text-neutral-950"
        >
          See all <ArrowRight size={16} />
        </Button>
      </div>
      <div className="w-full">
        <ProductSlider />
      </div>
    </section>
  );
}
