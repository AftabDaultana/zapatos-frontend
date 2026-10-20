import useEmblaCarousel from "embla-carousel-react";
import { getAllBlogs, type Blog } from "../../services/blogServices";
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
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllBlogs(page, 6);

        setBlogs((previousBlogs) =>
          page === 1
            ? response.blogs
            : [
                ...previousBlogs,
                ...response.blogs.filter(
                  (blog) =>
                    !previousBlogs.some(
                      (previousBlog) => previousBlog._id === blog._id,
                    ),
                ),
              ],
        );

        setHasMore(response.pagination.hasMore);
      } catch {
        setError("Unable to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  useEffect(() => {
    if (!emblaAPI || loading) return;

    emblaAPI.reInit();
  }, [emblaAPI, blogs.length, loading]);

  useEffect(() => {
    if (!emblaAPI || loading || !hasMore) return;

    const onSelect = () => {
      const selectedIndex = emblaAPI.selectedScrollSnap();
      const totalSnaps = emblaAPI.scrollSnapList().length;

      if (selectedIndex >= totalSnaps - 2) {
        setPage((currentPage) => currentPage + 1);
      }
    };

    emblaAPI.on("select", onSelect);

    return () => {
      emblaAPI.off("select", onSelect);
    };
  }, [emblaAPI, loading, hasMore]);

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
      {loading && <p>Loading blogs...</p>}
      {error && <p>{error}</p>}
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="shrink-0 basis-1/2 lg:basis-1/3 xl:basis-1/4 px-2"
            >
              <BlogCard
                title={blog.title}
                image={blog.image}
                excerpt={blog.content.slice(0, 150)}
                slug={blog.slug}
              />
            </div>
          ))}
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
