import SubCategoryCard from "../../ui/SubCategoryCard";
import { useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectCategoryById,
  selectSubCategoriesByCategoryId,
} from "../../../app/selectors/catalogSelectors";

interface MegaMenuProps {
  categoryId: number;
}

export default function MegaMenu({ categoryId }: MegaMenuProps) {
  const category = useAppSelector((state) =>
    selectCategoryById(state, categoryId),
  );

  const menuItems = useAppSelector((state) =>
    selectSubCategoriesByCategoryId(state, categoryId),
  );

  if (!category) {
    return null;
  }

  return (
    <section className="flex items-center justify-center gap-6 px-6 py-8">
      {menuItems.map((item) => (
        <SubCategoryCard
          key={item.id}
          title={item.name}
          imageUrl={item.image}
          imageFit={item.categoryId === 4 ? "contain" : "cover"}
          path={`/category/${category.slug}/${item.slug}`}
        />
      ))}
    </section>
  );
}
