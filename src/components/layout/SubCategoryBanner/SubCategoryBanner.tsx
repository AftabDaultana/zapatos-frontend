import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectSubCategoriesByCategoryId } from "../../../app/selectors/catalogSelectors";

import SubCategoryCard from "../../ui/SubCategoryCard";

interface SubCateggoryBannerProps {
  categoryId: number;
  categorySlug: string;
  activeSubCategoryId?: number;
}

export default function SubCategoryBanner({
  categoryId,
  categorySlug,
  activeSubCategoryId,
}: SubCateggoryBannerProps) {
  const subCategories = useAppSelector((state) =>
    selectSubCategoriesByCategoryId(state, categoryId),
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const updatePagination = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    updatePagination();

    emblaApi.on("select", updatePagination);
    emblaApi.on("reInit", updatePagination);

    return () => {
      emblaApi.off("select", updatePagination);
      emblaApi.off("reInit", updatePagination);
    };
  }, [emblaApi]);

  return (
    <section className="py-4">
      {/* Desktop */}
      <div className="hidden xl:flex items-center justify-center gap-6">
        {subCategories.map((subCategory) => (
          <SubCategoryCard
            key={subCategory.id}
            title={subCategory.name}
            imageUrl={subCategory.image}
            imageFit={subCategory.categoryId === 4 ? "contain" : "cover"}
            isActive={subCategory.id === activeSubCategoryId}
            path={`/category/${categorySlug}/${subCategory.slug}`}
          />
        ))}
      </div>

      {/* Mobile + Tablet */}
      <div className="xl:hidden">
        {/* Embla viewport */}
        <div ref={emblaRef} className="overflow-hidden">
          {/* Embla container */}
          <div className="-ml-4 flex">
            {subCategories.map((subCategory) => (
              <div
                key={subCategory.id}
                className="
                  min-w-0
                  flex-[0_0_50%]
                  pl-4
                  md:flex-[0_0_33.333333%]
                "
              >
                <SubCategoryCard
                  title={subCategory.name}
                  imageUrl={subCategory.image}
                  imageFit={subCategory.categoryId === 4 ? "contain" : "cover"}
                  isActive={subCategory.id === activeSubCategoryId}
                  path={`/category/${categorySlug}/${subCategory.slug}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {scrollSnaps.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={selectedIndex === index ? "true" : undefined}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-200
                  ${
                    selectedIndex === index
                      ? "w-5 bg-neutral-950"
                      : "w-2 bg-neutral-400"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
