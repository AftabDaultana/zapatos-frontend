import { ArrowRight } from "lucide-react";
import Button from "../../../ui/Button";

export default function NewsletterForm() {
  return (
    <div className="relative z-10 flex justify-center w-full ">
      <div className="flex max-w-163.25 h-12 gap-1.5 bg-neutral-100 lg:w-full">
        <input
          placeholder="Your Email"
          className="flex-1 min-w-0 px-3 py-3 text-sm leading-6 text-neutral-900 placeholder:text-neutral-700 outline-none"
        />
        <Button
          type="submit"
          variant="dark"
          className="flex w-27.5 rounded-none items-center justify-center gap-1.5 py-2 text-base leading-7 sm:2-29.5 sm:text-lg lg:w-32"
        >
          SIGN UP <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
