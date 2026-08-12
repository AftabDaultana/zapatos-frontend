import useEmblaCarousel from "embla-carousel-react";
import { blogs } from "../../data/blogs";
import BlogCard from "../ui/BlogCard";
import { useEffect, useState } from "react";
import AutoScroll from "embla-carousel-auto-scroll";

const visibleDots = 4;

function BlogSlider() {
  const [emblaRef, emblaAPI] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
    },
    [
      AutoScroll({
        speed: 0.5,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
        <div className="flex gap-4">
          {blogs.map((blog) => {
            return (
              <div
                key={blog.id}
                className="shrink-0 basis-1/2 lg:basis-1/3 xl:basis-1/4 px-2"
              >
                <BlogCard
                  title={blog.title}
                  excerpt={blog.excerpt}
                  image={blog.image}
                />
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

export default BlogSlider;
