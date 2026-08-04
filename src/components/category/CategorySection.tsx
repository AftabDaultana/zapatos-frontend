import CategoryGrid from "./CategoryGrid";

function CategorySection() {
  return (
    <div className="px-4 md:px-6 xl:px-8 flex flex-col gap-6">
      <div className="flex items-center justify-center">
        <h4 className="text-neutral-950 text text-3xl leading-9 font-bold">
          FIND YOUR PERFECT PAIR
        </h4>
      </div>
      <CategoryGrid />
    </div>
  );
}

export default CategorySection;
