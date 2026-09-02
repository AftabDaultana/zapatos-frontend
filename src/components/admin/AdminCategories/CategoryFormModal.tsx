import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../../ui/Button";
import type { Category } from "../../../data/categories";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { addCategory, editCategory } from "../../../app/slices/catalogSlice";
import { selectCategories } from "../../../app/selectors/catalogSelectors";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
}

interface CategoryFormData {
  name: string;
  slug: string;
}

const slugify = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function CategoryFormModal({
  isOpen,
  onClose,
  category,
}: CategoryFormModalProps) {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    slug: "",
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const isEditing = Boolean(category);

  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    if (!isOpen) return;

    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
      });
    }

    setFormErrors([]);
  }, [isOpen, category]);

  if (!isOpen) return null;

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: isEditing ? prev.slug : slugify(value),
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Category name is required.");
    }

    if (!formData.slug.trim()) {
      errors.push("Category slug is required.");
    }

    return errors;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-form-title"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div>
            <h2
              id="category-form-title"
              className="text-xl font-semibold text-neutral-950"
            >
              {isEditing ? "Edit Category" : "Add Category"}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {isEditing
                ? "Update the category details below."
                : "Create a new product category."}
            </p>
          </div>

          <Button
            type="button"
            onClick={onClose}
            aria-label="Close category form"
            variant="none"
            className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Form */}
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const errors = validateForm();

            if (errors.length > 0) {
              setFormErrors(errors);
              return;
            }

            setFormErrors([]);

            const categoryData = {
              name: formData.name.trim(),
              slug: slugify(formData.slug),
            };

            if (category) {
              dispatch(
                editCategory({
                  ...category,
                  ...categoryData,
                }),
              );
            } else {
              dispatch(
                addCategory({
                  id:
                    categories.length > 0
                      ? Math.max(...categories.map((category) => category.id)) +
                        1
                      : 1,
                  ...categoryData,
                  name: categoryData.name.toUpperCase(),
                }),
              );
            }

            onClose();
          }}
          className="flex flex-col gap-5 px-6 py-6"
        >
          {/* Errors */}
          {formErrors.length > 0 && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              <ul className="list-inside list-disc space-y-1">
                {formErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Category Name */}
          <div>
            <label
              htmlFor="category-name"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              Category Name
            </label>

            <input
              id="category-name"
              type="text"
              value={formData.name}
              onChange={(event) => handleNameChange(event.target.value)}
              placeholder="e.g. Accessories"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="category-slug"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              Slug
            </label>

            <input
              id="category-slug"
              type="text"
              value={formData.slug}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  slug: event.target.value,
                }))
              }
              placeholder="e.g. accessories"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            />

            <p className="mt-2 text-xs text-neutral-500">
              Used in the category URL.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-2 flex justify-end gap-3 border-t border-neutral-200 pt-5">
            <Button
              type="button"
              onClick={onClose}
              variant="none"
              className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="dark"
              className="px-5 py-3 text-sm font-medium"
            >
              {isEditing ? "Save Changes" : "Add Category"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
