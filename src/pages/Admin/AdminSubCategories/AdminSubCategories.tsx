import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { deleteSubCategory } from "../../../app/slices/catalogSlice";
import type { SubCategory } from "../../../data/subCategories";
import SubCategoryFormModal from "../../../components/admin/AdminSubCategories/SubCategoryFormModal";
import AlertModal from "../../../components/ui/AlertModal";

export default function AdminSubCategories() {
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [isSubCategoryFormModalOpen, setIsSubCategoryFormModalOpen] =
    useState(false);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState<number | null>(
    null,
  );

  const subCategories = useAppSelector((state) => state.catalog.subCategories);

  const subCategoryToDeleteData = subCategories.find(
    (subCategory) => subCategory.id === subCategoryToDelete,
  );

  const categories = useAppSelector((state) => state.catalog.categories);

  const dispatch = useAppDispatch();

  const totalPages = Math.ceil(subCategories.length / ITEMS_PER_PAGE);

  const paginatedSubCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return subCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, subCategories]);

  const startItem =
    subCategories.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, subCategories.length);

  const getCategoryName = (categoryId: number) => {
    return (
      categories.find((category) => category.id === categoryId)?.name ??
      "Unknown"
    );
  };

  const handleDeleteSubCategory = (subCategoryId: number) => {
    const subCategory = subCategories.find(
      (subCategory) => subCategory.id === subCategoryId,
    );

    if (!subCategory) return;

    setSubCategoryToDelete(subCategoryId);
  };

  const handleConfirmDeleteSubCategory = () => {
    if (subCategoryToDelete === null) return;

    dispatch(deleteSubCategory(subCategoryToDelete));
    setSubCategoryToDelete(null);
  };

  return (
    <main className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">SUBCATEGORIES</h1>

          <p className="mt-1 text-sm text-neutral-500">
            Manage your product subcategories.
          </p>
        </div>

        <Button
          type="button"
          variant="dark"
          onClick={() => {
            setSelectedSubCategory(null);
            setIsSubCategoryFormModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition"
        >
          <Plus size={18} />
          Add Subcategory
        </Button>
      </div>

      <section className="overflow-hidden rounded-2xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <thead>
              <tr className="border-b border-neutral-300 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  ID
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Subcategory Name
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Category
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
              {paginatedSubCategories.length > 0 ? (
                paginatedSubCategories.map((subCategory) => (
                  <tr
                    key={subCategory.id}
                    className="border-b border-neutral-300 last:border-b-0"
                  >
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {subCategory.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={subCategory.image}
                          alt={subCategory.name}
                          className="h-12 w-12 rounded-full bg-neutral-200 object-contain"
                        />

                        <p className="text-sm font-medium text-neutral-950">
                          {subCategory.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {getCategoryName(subCategory.categoryId)}
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {subCategory.slug}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5 text-neutral-500">
                        <Button
                          type="button"
                          variant="none"
                          aria-label={`Edit ${subCategory.name}`}
                          onClick={() => {
                            setSelectedSubCategory(subCategory);
                            setIsSubCategoryFormModalOpen(true);
                          }}
                          className="transition hover:text-red-600"
                        >
                          <Pencil size={20} />
                        </Button>

                        <Button
                          type="button"
                          variant="none"
                          aria-label={`Delete ${subCategory.name}`}
                          onClick={() =>
                            handleDeleteSubCategory(subCategory.id)
                          }
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
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-neutral-500"
                  >
                    No subcategories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {subCategories.length > 0 && (
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
                  {subCategories.length}
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

      <SubCategoryFormModal
        isOpen={isSubCategoryFormModalOpen}
        onClose={() => setIsSubCategoryFormModalOpen(false)}
        subCategory={selectedSubCategory}
      />
      <AlertModal
        isOpen={subCategoryToDelete !== null}
        type="confirmation"
        title="Delete Subcategory"
        message={
          subCategoryToDeleteData
            ? `Are you sure you want to delete "${subCategoryToDeleteData.name}"?`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDeleteSubCategory}
        onClose={() => setSubCategoryToDelete(null)}
      />
    </main>
  );
}
