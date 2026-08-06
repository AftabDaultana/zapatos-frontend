import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function BlogSection() {
  return (
    <section className="hidden md:flex flex-col px-4 md:px-6 xl:px-8 gap-8 md:gap-12 items-center">
      <div className="flex flex-col gap-3 items-center">
        <h4 className="text-3xl leading-9 font-bold">BRANDS</h4>
        <Button className="py-3 h-10 gap-1.5 text-lg leading-7 text-neutral-950 bg-transparent">
          See all <ArrowRight size={16} />
        </Button>
      </div>
      <div className="w-full">{/* Blog Carousel */}</div>
    </section>
  );
}
