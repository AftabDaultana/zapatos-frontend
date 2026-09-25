import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getAllCategories,
  type Category,
} from "../../services/categoryServices";
import {
  getAllProducts,
  getProductsByCategoryId,
  getProductsBySubCategoryId,
  type Product,
} from "../../services/productServices";
import {
  getSubCategoriesByCategoryId,
  type SubCategory,
} from "../../services/subcategoryServices";

import Breadcrumb from "../../components/layout/Breadcrumb/Breadcrumb";
import SubCategoryBanner from "../../components/layout/SubCategoryBanner/SubCategoryBanner";
import Button from "../../components/ui/Button";
import ProductGrid from "../../components/grids/ProductGrid";
import FilterPanel from "../../components/ui/Filters/FilterPanel";
import { X } from "lucide-react";

import { useAppSelector } from "../../hooks/reduxHooks";
import { selectCatalogFilters } from "../../app/selectors/catalogSelectors";

const PRODUCTS_PER_PAGE = 8;

export default function CategoryProducts() {
  const { categorySlug, subCategorySlug } = useParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const [productsPerPage, setProductsPerPage] = useState(PRODUCTS_PER_PAGE);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { types, sizes, colors, minPrice, maxPrice, minRating } =
    useAppSelector(selectCatalogFilters);

  const isNewArrivals = window.location.pathname === "/new-arrivals";
  const isFeatured = window.location.pathname === "/featured";
  const isSustainable = window.location.pathname === "/sustainable";
  const isHighTops = window.location.pathname === "/high-tops";

  useEffect(() => {
    const fetchCategory = async () => {
      const categories = await getAllCategories();

      const foundCategory = categories.find(
        (category) => category.slug === categorySlug,
      );

      setCategory(foundCategory ?? null);
    };

    fetchCategory();
  }, [categorySlug]);

  useEffect(() => {
    const fetchSubCategory = async () => {
      if (!category?._id || !subCategorySlug) {
        setSubCategory(null);
        return;
      }

      const subCategories = await getSubCategoriesByCategoryId(category._id);

      const foundSubCategory = subCategories.find(
        (subCategory) => subCategory.slug === subCategorySlug,
      );

      setSubCategory(foundSubCategory ?? null);
    };

    fetchSubCategory();
  }, [category?._id, subCategorySlug]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (isNewArrivals) {
          const result = await getAllProducts(
            1,
            productsPerPage,
            undefined,
            true,
          );

          setProducts(result.products);
          setTotalProducts(result.pagination.totalProducts);
          return;
        }

        if (isFeatured) {
          const result = await getAllProducts(
            1,
            productsPerPage,
            undefined,
            undefined,
            true,
          );

          setProducts(result.products);
          setTotalProducts(result.pagination.totalProducts);
          return;
        }

        if (isSustainable) {
          const result = await getAllProducts(
            1,
            productsPerPage,
            undefined,
            undefined,
            undefined,
            true,
          );

          setProducts(result.products);
          setTotalProducts(result.pagination.totalProducts);
          return;
        }

        if (isHighTops) {
          const result = await getAllProducts(
            1,
            productsPerPage,
            undefined,
            undefined,
            undefined,
            undefined,
            true,
          );

          setProducts(result.products);
          setTotalProducts(result.pagination.totalProducts);
          return;
        }

        if (!category?._id) {
          return;
        }

        const filters = {
          page: 1,
          limit: productsPerPage,
          minPrice: minPrice ?? undefined,
          maxPrice: maxPrice ?? undefined,
          sizes,
          colors,
          type: types.length > 0 ? types[0] : undefined,
          rating: minRating ?? undefined,
        };

        const result = subCategory
          ? await getProductsBySubCategoryId(subCategory._id, filters)
          : await getProductsByCategoryId(category._id, filters);

        setProducts(result.products);
        setTotalProducts(result.pagination.totalProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
        setTotalProducts(0);
      }
    };

    fetchProducts();
  }, [
    category?._id,
    subCategory?._id,
    productsPerPage,
    types,
    sizes,
    colors,
    minPrice,
    maxPrice,
    minRating,
    isNewArrivals,
    isFeatured,
    isSustainable,
    isHighTops,
  ]);

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
        {isNewArrivals
          ? "NEW ARRIVALS"
          : isFeatured
            ? "FEATURED PRODUCTS"
            : isSustainable
              ? "SUSTAINABLE SNEAKERS"
              : isHighTops
                ? "HIGH TOPS"
                : (subCategory?.name.toUpperCase() ??
                  category?.name.toUpperCase() ??
                  "CATEGORY")}
      </h1>

      {category && !isNewArrivals && !isFeatured && !isHighTops && (
        <SubCategoryBanner
          categoryId={category._id}
          categorySlug={category.slug}
          activeSubCategoryId={subCategory?._id}
        />
      )}

      <div className="flex items-center justify-between border border-neutral-300 p-4">
        <Button
          type="button"
          variant="light"
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className="px-5 py-3 text-sm font-medium"
        >
          {isFilterOpen ? "HIDE FILTERS" : "FILTER"}
        </Button>

        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-700">No active filters</span>

          <Button
            type="button"
            variant="none"
            className="text-sm font-medium text-neutral-950"
          >
            CLEAR ALL
          </Button>
        </div>
      </div>

      <div className="slex items-center justify-between">
        <p className="text-lg text-neutral-800">
          Showing {products.length > 0 ? `1 - ${products.length}` : "0"} of{" "}
          {totalProducts}
        </p>
      </div>

      <ProductGrid products={products} />

      {products.length < totalProducts && (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="light"
            onClick={() =>
              setProductsPerPage((prev) => prev + PRODUCTS_PER_PAGE)
            }
            className="px-8 py-3 text-sm font-medium"
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
                variant="none"
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
