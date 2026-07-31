import SubCategoryCard from "../subCategory/SubCategoryCard";
import { subCategories } from "../../data/subCategories";

interface MegaMenuProps {
  categoryId: number;
}

export default function MegaMenu({ categoryId }: MegaMenuProps) {
  const menuItems = subCategories.filter((item) => {
    return item.categoryId === categoryId;
  });

  return (
    <section className="flex items-center justify-center px-6 py-8 gap-6">
      {menuItems.map((item) => {
        return (
          <SubCategoryCard
            key={item.id}
            title={item.name}
            imageUrl={item.image}
            imageFit={item.categoryId === 4 ? "contain" : "cover"}
          />
        );
      })}
    </section>
  );
}
