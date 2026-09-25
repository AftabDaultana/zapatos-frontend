import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "../ui/ProductCard";
import { useEffect, useState } from "react";
import { getAllProducts, type Product } from "../../services/productServices";

const visibleDots = 4;

export default function ProductSlider() {
  const [emblaRef, emblaAPI] = useEmblaCarousel({
    align: "start",
  });
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const result = await getAllProducts(1, 10, undefined, undefined, true);
        setFeaturedProducts(result.products);
      } catch (error) {
        console.error("Failed to fetch error: ", error);
        setFeaturedProducts([]);
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (!emblaAPI) return;

    const api = emblaAPI;

    setScrollSnaps(api.scrollSnapList());

    function onSelect() {
      setSelectedIndex(api.selectedScrollSnap());
    }

    function onReInit() {
      setScrollSnaps(api.scrollSnapList());
      onSelect();
    }

    api.on("select", onSelect);

    api.on("reInit", onReInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [emblaAPI]);

  const totalSnaps = scrollSnaps.length;

  const windowStart = Math.min(
    Math.max(selectedIndex - 1, 0),
    Math.max(totalSnaps - visibleDots, 0),
  );

  const dotCount = Math.min(visibleDots, totalSnaps);

  return (
    <div className="flex flex-col items-center gap-8 md:gap-12">
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8">
          {featuredProducts.map((product) => {
            return (
              <div
                key={product._id}
                className="shrink-0 basis-1/2 md:basis-1/3 xl:basis-1/4"
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: dotCount }).map((_, index) => {
          const snapIndex = windowStart + index;
          return (
            <button
              key={snapIndex}
              onClick={() => emblaAPI?.scrollTo(snapIndex)}
              className={`h-2 w-2 rounded-full transition-colors ${
                snapIndex === selectedIndex
                  ? "bg-neutral-950"
                  : "bg-neutral-400"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
