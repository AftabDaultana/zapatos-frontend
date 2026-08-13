import { useParams } from "react-router-dom";
import { useState } from "react";
import Breadcrumb from "../../components/layout/Breadcrumb/Breadcrumb";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  selectCategoryBySlug,
  selectProductsByCategoryId,
  selectProductsBySubCategoryId,
  selectSubCategoryBySlug,
  selectProductsByFilters,
} from "../../app/selectors/catalogSelectors";
import SubCategoryBanner from "../../components/layout/SubCategoryBanner/SubCategoryBanner";
import Button from "../../components/ui/Button";
import ProductGrid from "../../components/grids/ProductGrid";
import FilterPanel from "../../components/ui/Filters/FilterPanel";
import { X } from "lucide-react";

const PRODUCTS_PER_PAGE = 8;

export default function CategoryProducts() {
  const [productsPerPage, setProductsPerPage] = useState(PRODUCTS_PER_PAGE);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { categorySlug, subCategorySlug } = useParams();
  const category = useAppSelector((state) =>
    selectCategoryBySlug(state, categorySlug),
  );

  const subCategory = useAppSelector((state) =>
    selectSubCategoryBySlug(state, subCategorySlug),
  );

  const products = useAppSelector((state) => {
    if (subCategory) {
      return selectProductsBySubCategoryId(state, subCategory.id);
    }
    return selectProductsByCategoryId(state, category?.id);
  });

  const filteredProducts = useAppSelector((state) =>
    selectProductsByFilters(state, products),
  );

  const visibleProducts = filteredProducts.slice(0, productsPerPage);

  return (
    <main className="flex flex-col gap-6 px-6 py-6 md:px-12">
      <Breadcrumb
        items={[
          { label: "HOME", path: "/" },
          ...(category
            ? [
                {
                  label: category.name.toUpperCase(),
                  path: `/category/${categorySlug}`,
                },
              ]
            : []),
          ...(subCategory ? [{ label: subCategory.name.toUpperCase() }] : []),
        ]}
      />

      <h1 className="text-3xl font-medium text-neutral-950">
        {subCategory?.name.toUpperCase() ??
          category?.name.toUpperCase() ??
          "CATEGORY"}
      </h1>
      {category && (
        <SubCategoryBanner
          categoryId={category.id}
          categorySlug={category.slug}
          activeSubCategoryId={subCategory?.id}
        />
      )}
      <div className="flex items-center justify-between border border-neutral-300 p-4">
        <Button
          type="button"
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className="border border-neutral-950 px-5 py-3 text-sm font-medium text-neutral-950"
        >
          {isFilterOpen ? "HIDE FILTERS" : "FILTER"}
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-700">No active filters</span>
          <Button
            type="button"
            className="text-sm font-medium text-neutral-950"
          >
            CLEAR ALL
          </Button>
        </div>
      </div>
      <div className="slex items-center justify-between">
        <p className="text-lg text-neutral-800">
          Showing{" "}
          {filteredProducts.length > 0
            ? `1 - ${Math.min(productsPerPage, filteredProducts.length)}`
            : "0"}
        </p>
      </div>
      <ProductGrid products={visibleProducts} />
      {productsPerPage < filteredProducts.length && (
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={() =>
              setProductsPerPage((prev) => prev + PRODUCTS_PER_PAGE)
            }
            className="border border-neutral-950 px-8 py-3 text-sm font-medium text-neutral-950"
          >
            SHOW MORE
          </Button>
        </div>
      )}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setIsFilterOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <aside className="absolute left-0 top-0 h-full w-[85%] max-w-100 overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-medium text-neutral-950">FILTERS</h2>

              <Button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="text-sm font-medium text-neutral-950"
              >
                <X size={28} />
              </Button>
            </div>

            <FilterPanel />
          </aside>
        </div>
      )}
    </main>
  );
}
