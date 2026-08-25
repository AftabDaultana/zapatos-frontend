import {
  ChevronLeft,
  ChevronRight,
  Funnel,
  Search,
  Trash2,
} from "lucide-react";
import Button from "../../ui/Button";
import { useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectCategories,
  selectProducts,
  selectSubCategories,
} from "../../../app/selectors/catalogSelectors";
import { Link } from "react-router-dom";
import { useState } from "react";

type PaginationPage = number | "...";

const PRODUCTS_PER_PAGE = 10;

export default function AdminProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const subCategories = useAppSelector(selectSubCategories);
  const handleDeteProduct = () => {
    return;
  };
  const getProductCategories = (subCategoryId: number[]) => {
    const categoryIds = subCategoryId
      .map(
        (id) =>
          subCategories.find((subCategory) => subCategory.id === id)
            ?.categoryId,
      )
      .filter((id): id is number => id !== undefined);

    const uniqueCategoryIds = [...new Set(categoryIds)];

    return categories
      .filter((category) => uniqueCategoryIds.includes(category.id))
      .map((category) => category.name)
      .join(", ");
  };

  const totalProducts = products.length;

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

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

  const paginationPages = getPaginationPages(currentPage, totalPages);

  return (
    <main className="p-6 flex flex-col gap-16">
      <div>
        <h2 className="text-lg font-bold text-neutral-950">Products List</h2>
      </div>
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Button
          type="button"
          className="flex gap-2 w-fit rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700"
        >
          <Funnel size={24} /> <div className="w-px h-4 bg-neutral-500" />{" "}
          Filters
        </Button>

        <div className="flex flex-1 items-center gap-3 lg:max-w-xl">
          <div className="flex flex-1 items-center overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <input
              type="text"
              placeholder="Type your product name"
              className="min-w-0 flex-1 px-4 py-2 text-sm text-neutral-950 outline-none placeholder:text-neutral-400"
            />

            <Button
              type="button"
              className="px-4 py-2 text-neutral-500 transition hover:text-neutral-950"
              aria-label="Search products"
            >
              <Search size={24} />
            </Button>
          </div>
        </div>

        <Button
          type="button"
          className="rounded-lg bg-neutral-950 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          + Add new product
        </Button>
      </section>
      <section className="rounded-2xl bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead>
              <tr className="border-b border-neutral-300 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  <input
                    type="checkbox"
                    aria-label="Select All Products"
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
              {currentProducts.map((product) => (
                <tr className="border-b border-neutral-300 last:border-b-0">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      aria-label={`Select ${product.name}`}
                      className="h4-w-4"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/products/:${product.id}`}>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-12 w-12 rounded-full bg-neutral-200 object-contain"
                        />

                        <div>
                          <p className="text-sm font-medium text-neutral-950">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">
                    SKU-{product.id.toString().padStart(4, "0")}
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
                          ? "bg-blue-300 text-neutral-950"
                          : "bg-red-400 text-neutral-100"
                      }`}
                    >
                      {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">
                    {product.rating} ({product.ratingCount})
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-6">
                      <Search size={20} />
                      <Trash2 size={20} onClick={() => handleDeteProduct()} />
                    </div>
                  </td>
                </tr>
              ))}
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
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
                className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

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
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-[#16DBCC] text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((page) => page + 1)}
                className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
