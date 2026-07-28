import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex h-12 w-full items-center border border-secondary-1000 p-3">
      <input
        type="text"
        placeholder="Search for products"
        className="flex-1 outline-none text-sm leading-6 font-light text-neutral-700 placeholder:text-neutral-700"
      />
      <Search size={20} className="text-neutral-700" />
    </div>
  );
}
