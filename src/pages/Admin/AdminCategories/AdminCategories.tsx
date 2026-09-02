import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { deleteCategory } from "../../../app/slices/catalogSlice";
import type { Category } from "../../../data/categories";
import CategoryFormModal from "../../../components/admin/AdminCategories/CategoryFormModal";
import AlertModal from "../../../components/ui/AlertModal";

export default function AdminCategories() {
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryFormModalOpen, setIsCategoryFormModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const categories = useAppSelector((state) => state.catalog.categories);

  const categoryToDeleteData = categories.find(
    (category) => category.id === categoryToDelete,
  );

  const dispatch = useAppDispatch();

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, categories]);

  const startItem =
    categories.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, categories.length);

  const handleDeleteCategory = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId);

    if (!category) return;

    setCategoryToDelete(categoryId);
  };

  const handleConfirmDeleteCategory = () => {
    if (categoryToDelete === null) return;

    dispatch(deleteCategory(categoryToDelete));
    setCategoryToDelete(null);
  };
  return (
    <main className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">CATEGORIES</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your product categories.
          </p>
        </div>

        <Button
          type="button"
          variant="dark"
          onClick={() => {
            setSelectedCategory(null);
            setIsCategoryFormModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition"
        >
          <Plus size={18} />
          Add Category
        </Button>
      </div>

      <section className="overflow-hidden rounded-2xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175">
            <thead>
              <tr className="border-b border-neutral-300 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  ID
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Category Name
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Slug
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-neutral-300 last:border-b-0"
                  >
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {category.id}
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-neutral-950">
                        {category.name}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {category.slug}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5 text-neutral-500">
                        <Button
                          type="button"
                          variant="none"
                          aria-label={`Edit ${category.name}`}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsCategoryFormModalOpen(true);
                          }}
                          className="transition hover:text-red-600"
                        >
                          <Pencil size={20} />
                        </Button>

                        <Button
                          type="button"
                          variant="none"
                          aria-label={`Delete ${category.name}`}
                          onClick={() => handleDeleteCategory(category.id)}
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
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-neutral-500"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {categories.length > 0 && (
            <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-4">
              <p className="text-sm text-neutral-500">
                Showing{" "}
                <span className="font-medium text-neutral-950">
                  {startItem}
                </span>{" "}
                -{" "}
                <span className="font-medium text-neutral-950">{endItem}</span>{" "}
                of{" "}
                <span className="font-medium text-neutral-950">
                  {categories.length}
                </span>
              </p>

              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="none"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </Button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <Button
                    key={page}
                    type="button"
                    variant="none"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-[#16DBCC] text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  type="button"
                  variant="none"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                  className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      <CategoryFormModal
        isOpen={isCategoryFormModalOpen}
        onClose={() => setIsCategoryFormModalOpen(false)}
        category={selectedCategory}
      />
      <AlertModal
        isOpen={categoryToDelete !== null}
        type="confirmation"
        title="Delete Category"
        message={
          categoryToDeleteData
            ? `Are you sure you want to delete "${categoryToDeleteData.name}"? This will also delete its subcategories.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDeleteCategory}
        onClose={() => setCategoryToDelete(null)}
      />
    </main>
  );
}
