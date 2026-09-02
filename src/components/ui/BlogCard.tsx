import { ArrowRight } from "lucide-react";
import Button from "./Button";

interface BlogCardProps {
  image: string;
  title: string;
  excerpt: string;
}

export default function BlogCard({ image, title, excerpt }: BlogCardProps) {
  return (
    <div className="group flex flex-col xl:w-[409.5px] md:w-[251.33px] w-[163.5px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative w-full h-35.5 md:h-54.5 xl:h-98 rounded-t-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="relative w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col px-6 py-3 gap-4 justify-center h-48 bg-[#f7f7f7]">
        <div className="w-full min-w-0 flex flex-col gap-4">
          <span className="block w-full truncate text-2xl leading-7 font-medium text-neutral-950">
            {title}
          </span>

          <span className="line-clamp-3 text-sm leading-[120%] font-normal text-neutral-900">
            {excerpt}
          </span>
        </div>

        <div>
          <Button
            variant="none"
            className="group/read-more h-10 gap-1.5 py-3 text-lg leading-7 text-neutral-950"
          >
            Read more
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/read-more:translate-x-1"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
