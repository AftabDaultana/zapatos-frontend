import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectProducts } from "../../../app/selectors/catalogSelectors";
import { useMemo, useState } from "react";
import Button from "../../ui/Button";

export default function SearchBar() {
  const products = useAppSelector(selectProducts);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 5;

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return products.filter((product) => {
      const name = String(product.name ?? "").toLowerCase();

      return name.includes(query);
    });
  }, [products, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <div className="relative w-full">
      <div className="flex h-12 w-full items-center border border-secondary-1000 rounded-lg p-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products"
          className="flex-1 outline-none text-sm leading-6 font-light text-neutral-700 placeholder:text-neutral-700"
        />
        {searchQuery ? (
          <X
            size={20}
            className="text-neutral-700"
            onClick={() => setSearchQuery("")}
          />
        ) : (
          <Search size={20} className="text-neutral-700" />
        )}
      </div>

      {searchQuery.trim() && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full border border-neutral-200 bg-white shadow-lg min-h-100">
          {filteredProducts.length > 0 ? (
            <div>
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex cursor-pointer items-center gap-3 border-b border-neutral-100 p-3 last:border-b-0 hover:bg-neutral-50"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-12 w-12 object-cover"
                  />

                  <div>
                    <p className="text-sm font-medium text-neutral-800">
                      {product.name}
                    </p>

                    <p className="text-sm text-neutral-600">
                      PKR {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {totalPages > 1 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center border-t border-neutral-100 p-2 gap-2">
                  <Button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    className="px-3 py-1 text-sm text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </Button>

                  <span className="text-xs text-neutral-500">
                    {currentPage} / {totalPages}
                  </span>

                  <Button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                    className="px-3 py-1 text-sm text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="p-4 text-sm text-neutral-600">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
