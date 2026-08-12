import { ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  return (
    <div className="relative z-10 flex justify-center w-full ">
      <div className="flex max-w-163.25 h-12 gap-1.5 bg-neutral-100 lg:w-full">
        <input
          placeholder="Your Email"
          className="flex-1 min-w-0 px-3 py-3 text-sm leading-6 text-neutral-900 placeholder:text-neutral-700 outline-none"
        />
        <button
          type="submit"
          className="flex w-27.5 items-center justify-center gap-1.5 bg-neutral-900 py-2 text-base leading-7 text-neutral-100 sm:2-29.5 sm:text-lg lg:w-32"
        >
          SIGN UP <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
