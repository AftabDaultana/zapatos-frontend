import {
  ChevronLeft,
  ChevronRight,
  Funnel,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Button from "../../ui/Button";
import ProductFiltersModal from "./ProductFiltersModal";

import {
  deleteProduct,
  getAllProducts,
  type Product,
} from "../../../services/productServices";

import ProductFormModal from "./ProductFormModal";
import AlertModal from "../../ui/AlertModal";

import { getAllCategories } from "../../../services/categoryServices";
import { getAllSubCategories } from "../../../services/subcategoryServices";

import type { Category } from "../../../services/categoryServices";
import type { SubCategory } from "../../../services/subcategoryServices";

type PaginationPage = number | "...";

const PRODUCTS_PER_PAGE = 10;

const getProductSku = (productId: string) =>
  `SKU-${productId.toString().padStart(4, "0")}`;

const getPaginationPages = (
  currentPage: number,
  totalPages: number,
): PaginationPage[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export default function AdminProducts() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedStock, setSelectedStock] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );

  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isProductsFormModalOpen, setIsProductsFormModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      let minPrice: number | undefined;
      let maxPrice: number | undefined;

      if (selectedPriceRange === "under-10000") {
        maxPrice = 9999;
      }

      if (selectedPriceRange === "10000-15000") {
        minPrice = 10000;
        maxPrice = 15000;
      }

      if (selectedPriceRange === "15000-20000") {
        minPrice = 15001;
        maxPrice = 20000;
      }

      if (selectedPriceRange === "over-20000") {
        minPrice = 20001;
      }

      const result = await getAllProducts(
        currentPage,
        PRODUCTS_PER_PAGE,
        searchTerm,
        undefined,
        undefined,
        undefined,
        undefined,
        selectedStock !== "all" ? selectedStock : undefined,
        selectedCategory !== "all" ? selectedCategory : undefined,
        selectedSubCategory !== "all" ? selectedSubCategory : undefined,
        selectedRating !== "all" ? Number(selectedRating) : undefined,
        minPrice,
        maxPrice,
      );

      setProducts(result.products);
      setTotalProducts(result.pagination.totalProducts);
      setTotalPages(result.pagination.totalPages);
    } catch {
      setProducts([]);
      setTotalProducts(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    currentPage,
    searchTerm,
    selectedStock,
    selectedCategory,
    selectedSubCategory,
    selectedRating,
    selectedPriceRange,
  ]);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const [categoriesResult, subCategoriesResult] = await Promise.all([
          getAllCategories(),
          getAllSubCategories(1, 100),
        ]);

        setCategories(categoriesResult);
        setSubCategories(subCategoriesResult.subCategories);
      } catch (error) {
        console.error("Failed to fetch catalog:", error);
        setCategories([]);
        setSubCategories([]);
      }
    };

    fetchCatalog();
  }, []);

  const productToDeleteData = products.find(
    (product) => product._id === productToDelete,
  );

  const getProductCategories = (subCategoryIds: string[]) => {
    const categoryIds = subCategoryIds
      .map(
        (subCategoryId) =>
          subCategories.find((subCategory) => subCategory._id === subCategoryId)
            ?.categoryId,
      )
      .filter((_id): _id is string => _id !== undefined);

    const uniqueCategoryIds = [...new Set(categoryIds)];

    return categories
      .filter((category) => uniqueCategoryIds.includes(category._id!))
      .map((category) => category.name)
      .join(", ");
  };

  const filteredProducts = products.filter(() => {
    const matchesCategory = true;

    const matchesSubCategory = true;

    const matchesRating = true;

    const matchesPrice = true;

    return (
      matchesCategory && matchesSubCategory && matchesRating && matchesPrice
    );
  });

  const currentProducts = filteredProducts;

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const paginationPages = getPaginationPages(currentPage, totalPages);

  const availableSubCategories =
    selectedCategory === "all"
      ? subCategories
      : subCategories.filter(
          (subCategory) => subCategory.categoryId === selectedCategory,
        );

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedSubCategory("all");
    setSelectedStock("all");
    setSelectedRating("all");
    setSelectedPriceRange("all");
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory("all");
    setCurrentPage(1);
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setCurrentPage(1);
  };

  const handleStockChange = (stock: string) => {
    setSelectedStock(stock);
    setCurrentPage(1);
  };

  const handleRatingChange = (rating: string) => {
    setSelectedRating(rating);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (priceRange: string) => {
    setSelectedPriceRange(priceRange);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteProduct = (productId: string) => {
    const product = products.find((product) => product._id === productId);

    if (!product) return;

    setProductToDelete(productId);
  };

  const handleConfirmDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete);

      setProducts((prev) =>
        prev.filter((product) => product._id !== productToDelete),
      );

      setProductToDelete(null);
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <main className="flex flex-col gap-8 p-6">
      <div>
        <h2 className="text-lg font-bold text-neutral-950">Products List</h2>
      </div>

      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Button
          type="button"
          variant="none"
          onClick={() => setIsFilterModalOpen(true)}
          className="flex w-fit items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700"
        >
          <Funnel size={22} />
          <span className="h-4 w-px bg-neutral-400" />
          Filters
        </Button>

        <div className="flex flex-1 items-center lg:max-w-xl">
          <div className="flex w-full items-center overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <input
              type="text"
              placeholder="Type your product name"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              className="min-w-0 flex-1 px-4 py-2 text-sm text-neutral-950 outline-none placeholder:text-neutral-400"
            />

            <Button
              type="button"
              variant="none"
              aria-label="Search products"
              className="px-4 py-2 text-neutral-500 transition hover:text-neutral-950"
            >
              <Search size={22} />
            </Button>
          </div>
        </div>

        <Button
          type="button"
          variant="dark"
          onClick={() => {
            setSelectedProduct(undefined);
            setIsProductsFormModalOpen(true);
          }}
          className="flex gap-2 px-5 py-2 text-sm font-medium"
        >
          <Plus size={16} />
          Add new product
        </Button>
      </section>

      <section className="overflow-hidden rounded-2xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead>
              <tr className="border-b border-neutral-300 text-left">
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    aria-label="Select all products"
                    className="h-4 w-4"
                  />
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Product Name
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  SKU/Serial
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Category
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Price
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Quantity
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Status
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Rating
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-sm text-neutral-500"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-neutral-300 last:border-b-0"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        aria-label={`Select ${product.name}`}
                        className="h-4 w-4"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <Link to={`/admin/products/${product.slug}`}>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-12 w-12 rounded-full bg-neutral-200 object-contain"
                          />

                          <p className="text-sm font-medium text-neutral-950">
                            {product.name}
                          </p>
                        </div>
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {getProductSku(product._id)}
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {getProductCategories(product.subCategoryId)}
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      PKR {product.discountedPrice.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {product.quantity}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          product.quantity > 0
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {product.rating} ({product.ratingCount})
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5 text-neutral-500">
                        <Link
                          to={`/admin/products/${product.slug}`}
                          aria-label={`View ${product.name}`}
                          className="transition hover:text-neutral-950"
                        >
                          <Search size={20} />
                        </Link>

                        <Button
                          type="button"
                          variant="none"
                          aria-label={`Edit ${product.name}`}
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsProductsFormModalOpen(true);
                          }}
                          className="transition hover:text-red-600"
                        >
                          <Pencil size={20} />
                        </Button>

                        <Button
                          type="button"
                          aria-label={`Delete ${product.name}`}
                          variant="none"
                          onClick={() => handleDeleteProduct(product._id)}
                          className="transition hover:text-red-600"
                        >
                          <Trash2 size={20} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-sm text-neutral-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-4">
            <p className="text-sm text-neutral-500">
              Showing{" "}
              <span className="font-medium text-neutral-950">
                {totalProducts === 0 ? 0 : startIndex + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium text-neutral-950">
                {Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-neutral-950">
                {totalProducts}
              </span>
            </p>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                disabled={currentPage === 1 || totalPages === 0}
                variant="none"
                onClick={() => handlePageChange(currentPage - 1)}
                className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </Button>

              {paginationPages.map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 py-2 text-sm text-neutral-400"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <Button
                    key={page}
                    type="button"
                    variant="none"
                    onClick={() => handlePageChange(page)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-[#16DBCC] text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {page}
                  </Button>
                );
              })}

              <Button
                type="button"
                disabled={currentPage === totalPages || totalPages === 0}
                variant="none"
                onClick={() => handlePageChange(currentPage + 1)}
                className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ProductFiltersModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        selectedSubCategory={selectedSubCategory}
        onSubCategoryChange={handleSubCategoryChange}
        subCategories={availableSubCategories}
        selectedStock={selectedStock}
        onStockChange={handleStockChange}
        selectedRating={selectedRating}
        onRatingChange={handleRatingChange}
        selectedPriceRange={selectedPriceRange}
        onPriceRangeChange={handlePriceRangeChange}
        onClearFilters={handleClearFilters}
      />

      <ProductFormModal
        isOpen={isProductsFormModalOpen}
        onClose={() => setIsProductsFormModalOpen(false)}
        categories={categories}
        subCategories={subCategories}
        product={selectedProduct}
        onSuccess={() => {
          setIsProductsFormModalOpen(false);
          fetchProducts();
        }}
      />

      <AlertModal
        isOpen={productToDelete !== null}
        type="confirmation"
        title="Delete Product"
        message={
          productToDeleteData
            ? `Are you sure you want to delete "${productToDeleteData.name}"?`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDeleteProduct}
        onClose={() => setProductToDelete(null)}
      />
    </main>
  );
}
