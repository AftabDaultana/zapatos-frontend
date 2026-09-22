import { useEffect, useState } from "react";
import SubCategoryCard from "../../ui/SubCategoryCard";
import {
  getAllCategories,
  type Category,
} from "../../../services/categoryServices";
import {
  getSubCategoriesByCategoryId,
  type SubCategory,
} from "../../../services/subcategoryServices";
interface MegaMenuProps {
  categoryId: string;
}
export default function MegaMenu({ categoryId }: MegaMenuProps) {
  const [isBrandsCategory, setIsBrandsCategory] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [menuItems, setMenuItems] = useState<SubCategory[]>([]);
  useEffect(() => {
    const fetchMenuData = async () => {
      const categories = await getAllCategories();
      const foundCategory = categories.find(
        (category) => category._id === categoryId,
      );
      setCategory(foundCategory ?? null);
      const brandsCategory = categories[3];
      setIsBrandsCategory(brandsCategory?._id === categoryId);
      const subCategories = await getSubCategoriesByCategoryId(categoryId);
      setMenuItems(subCategories);
    };
    fetchMenuData();
  }, [categoryId]);
  if (!category) {
    return null;
  }
  return (
    <section className="flex items-center justify-center gap-6 px-6 py-8">
      {" "}
      {menuItems.map((item) => (
        <SubCategoryCard
          key={item._id}
          title={item.name}
          imageUrl={item.image}
          imageFit={isBrandsCategory ? "contain" : "cover"}
          variant={isBrandsCategory ? "brand" : "default"}
          path={`/category/${category.slug}/${item.slug}`}
        />
      ))}{" "}
    </section>
  );
}
