import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectSubCategoriesByCategoryId } from "../../../app/selectors/catalogSelectors";
import SubCategoryCard from "../../ui/SubCategoryCard";

interface SubCateggoryBannerProps {
  categoryId: number;
  categorySlug: string;
  activeSubCategoryId?: number;
}

export default function SubCategoryBanner({
  categoryId,
  categorySlug,
  activeSubCategoryId,
}: SubCateggoryBannerProps) {
  const subCategories = useAppSelector((state) =>
    selectSubCategoriesByCategoryId(state, categoryId),
  );
  return (
    <section className="flex items-center justify-center gap-6 py-4">
      {subCategories.map((subCategory) => (
        <SubCategoryCard
          key={subCategory.id}
          title={subCategory.name}
          imageUrl={subCategory.image}
          imageFit={subCategory.categoryId === 4 ? "contain" : "cover"}
          isActive={subCategory.id === activeSubCategoryId}
          path={`/category/${categorySlug}/${subCategory.slug}`}
        />
      ))}
    </section>
  );
}
