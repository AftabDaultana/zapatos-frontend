import { X } from "lucide-react";
import Button from "../../ui/Button";
import type { Category } from "../../../data/categories";
import type { SubCategory } from "../../../data/subCategories";

interface ProductFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;

  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Category[];

  selectedSubCategory: string;
  onSubCategoryChange: (subCategory: string) => void;
  subCategories: SubCategory[];

  selectedStock: string;
  onStockChange: (stock: string) => void;

  selectedRating: string;
  onRatingChange: (rating: string) => void;

  selectedPriceRange: string;
  onPriceRangeChange: (priceRange: string) => void;

  onClearFilters: () => void;
}

export default function ProductFiltersModal({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedSubCategory,
  onSubCategoryChange,
  subCategories,
  selectedStock,
  onStockChange,
  selectedRating,
  onRatingChange,
  selectedPriceRange,
  onPriceRangeChange,
  onClearFilters,
}: ProductFiltersModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-bold text-neutral-950">
            Filter Products
          </h2>

          <Button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="flex flex-col gap-5 px-6 py-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="product-category"
              className="text-sm font-medium text-neutral-700"
            >
              Category
            </label>

            <select
              id="product-category"
              value={selectedCategory}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 outline-none focus:border-neutral-500"
            >
              <option value="all">All Categories</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="product-subcategory"
              className="text-sm font-medium text-neutral-700"
            >
              Subcategory
            </label>

            <select
              id="product-subcategory"
              value={selectedSubCategory}
              onChange={(event) => onSubCategoryChange(event.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 outline-none focus:border-neutral-500"
            >
              <option value="all">All Subcategories</option>

              {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="product-stock"
              className="text-sm font-medium text-neutral-700"
            >
              Stock
            </label>

            <select
              id="product-stock"
              value={selectedStock}
              onChange={(event) => onStockChange(event.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 outline-none focus:border-neutral-500"
            >
              <option value="all">All Stock</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Sold Out</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="product-rating"
              className="text-sm font-medium text-neutral-700"
            >
              Rating
            </label>

            <select
              id="product-rating"
              value={selectedRating}
              onChange={(event) => onRatingChange(event.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 outline-none focus:border-neutral-500"
            >
              <option value="all">All Ratings</option>
              <option value="5">5+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="product-price"
              className="text-sm font-medium text-neutral-700"
            >
              Price
            </label>

            <select
              id="product-price"
              value={selectedPriceRange}
              onChange={(event) => onPriceRangeChange(event.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 outline-none focus:border-neutral-500"
            >
              <option value="all">All Prices</option>
              <option value="under-10000">Under PKR 10,000</option>
              <option value="10000-15000">PKR 10,000 - 15,000</option>
              <option value="15000-20000">PKR 15,000 - 20,000</option>
              <option value="over-20000">Over PKR 20,000</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-4">
          <Button
            type="button"
            variant="light"
            onClick={onClearFilters}
            className="px-4 py-2 text-sm font-medium transition"
          >
            Clear Filters
          </Button>

          <Button
            type="button"
            variant="dark"
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium transition"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
