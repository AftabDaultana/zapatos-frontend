import useEmblaSlider from "embla-carousel-react";
import { brands } from "../../data/brands";

export default function BrandSlider() {
  const [emblaRef] = useEmblaSlider({
    align: "start",
    loop: true,
  });
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex items-center">
        {brands.map((brand) => {
          return (
            <div
              className="shrink-0 basis-1/3 lg:basis-1/5 xl:basis-1/6 px-4"
              key={brand.id}
            >
              <div className="h-full w-full flex items-center justify-center">
                <img src={brand.logo} alt={brand.name} className="h-12" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
