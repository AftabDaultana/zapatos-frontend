import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../../ui/Button";
import type { SubCategory } from "../../../services/subcategoryServices";
import {
  createSubCategory,
  updateSubCategory,
} from "../../../services/subcategoryServices";
import { getAllCategories } from "../../../services/categoryServices";
import type { Category } from "../../../services/categoryServices";

interface SubCategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  subCategory?: SubCategory | null;
}

interface SubCategoryFormData {
  name: string;
  slug: string;
  categoryId: string | "";
  image: string;
}

const slugify = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function SubCategoryFormModal({
  isOpen,
  onClose,
  onSuccess,
  subCategory,
}: SubCategoryFormModalProps) {
  const [formData, setFormData] = useState<SubCategoryFormData>({
    name: "",
    slug: "",
    categoryId: "",
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const isEditing = Boolean(subCategory);

  useEffect(() => {
    if (!isOpen) return;

    const fetchCategories = async () => {
      const result = await getAllCategories();
      setCategories(result);
    };

    fetchCategories();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (subCategory) {
      setFormData({
        name: subCategory.name,
        slug: subCategory.slug,
        categoryId: String(subCategory.categoryId),
        image: subCategory.image,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        categoryId: categories[0]?._id ?? "",
        image: "",
      });
    }

    setSelectedImage(null);
    setFormErrors([]);
  }, [isOpen, subCategory, categories]);

  if (!isOpen) return null;

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: slugify(value),
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Subcategory name is required.");
    }

    if (!formData.slug.trim()) {
      errors.push("Subcategory slug is required.");
    }

    if (formData.categoryId === "") {
      errors.push("Parent category is required.");
    }

    if (!formData.image && !selectedImage) {
      errors.push("Subcategory image is required.");
    }

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm();

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    setIsUploading(true);

    try {
      const selectedCategory = categories.find(
        (category) => category._id === formData.categoryId,
      );

      if (!selectedCategory) {
        setFormErrors(["Selected parent category does not exist."]);
        return;
      }

      if (!subCategory) {
        if (!selectedImage) {
          setFormErrors(["Subcategory image is required."]);
          return;
        }

        await createSubCategory({
          categoryName: selectedCategory.name,
          name: formData.name
            .trim()
            .replace(/\b\w/g, (char) => char.toUpperCase()),
          slug: slugify(formData.slug),
          image: selectedImage,
        });
      } else {
        await updateSubCategory(subCategory._id, {
          categoryName: selectedCategory.name,
          name: formData.name
            .trim()
            .replace(/\b\w/g, (char) => char.toUpperCase()),
          slug: slugify(formData.slug),
          ...(selectedImage ? { image: selectedImage } : {}),
        });
      }

      onSuccess?.();
      onClose();
    } catch {
      setFormErrors([
        isEditing
          ? "Unable to update the subcategory. Please try again."
          : "Unable to create the subcategory. Please try again.",
      ]);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="subcategory-form-title"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div>
            <h2
              id="subcategory-form-title"
              className="text-xl font-semibold text-neutral-950"
            >
              {isEditing ? "Edit Subcategory" : "Add Subcategory"}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {isEditing
                ? "Update the subcategory details below."
                : "Create a new product subcategory."}
            </p>
          </div>

          <Button
            type="button"
            variant="none"
            onClick={onClose}
            aria-label="Close subcategory form"
            className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6">
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

          {/* Subcategory Name */}
          <div>
            <label
              htmlFor="subcategory-name"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              Subcategory Name
            </label>

            <input
              id="subcategory-name"
              type="text"
              value={formData.name}
              onChange={(event) => handleNameChange(event.target.value)}
              placeholder="e.g. Athletic Shoes"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            />
          </div>

          {/* Parent Category */}
          <div>
            <label
              htmlFor="subcategory-category"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              Parent Category
            </label>

            <select
              id="subcategory-category"
              value={formData.categoryId}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  categoryId:
                    event.target.value === "" ? "" : event.target.value,
                }))
              }
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="subcategory-slug"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              Slug
            </label>

            <input
              id="subcategory-slug"
              type="text"
              value={formData.slug}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  slug: event.target.value,
                }))
              }
              placeholder="e.g. athletic-shoes"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            />

            <p className="mt-2 text-xs text-neutral-500">
              Used in the subcategory URL.
            </p>
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="subcategory-image"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              Image
            </label>

            {formData.image && !selectedImage && (
              <div className="mb-3 flex items-center gap-4">
                <img
                  src={formData.image}
                  alt={formData.name || "Subcategory preview"}
                  className="h-20 w-20 rounded-lg border border-neutral-200 bg-neutral-100 object-contain"
                />

                <p className="text-xs text-neutral-500">Current image</p>
              </div>
            )}

            {selectedImage && (
              <div className="mb-3 flex items-center gap-4">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="New subcategory preview"
                  className="h-20 w-20 rounded-lg border border-neutral-200 bg-neutral-100 object-contain"
                />

                <p className="text-xs text-neutral-500">New image selected</p>
              </div>
            )}

            <input
              id="subcategory-image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;

                setSelectedImage(file);

                if (file) {
                  setFormErrors((prev) =>
                    prev.filter(
                      (error) => error !== "Subcategory image is required.",
                    ),
                  );
                }
              }}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 file:mr-4 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-neutral-700"
            />

            <p className="mt-2 text-xs text-neutral-500">
              {isEditing
                ? "Select a new image to replace the current image."
                : "Select an image to upload to Cloudinary."}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-2 flex justify-end gap-3 border-t border-neutral-200 pt-5">
            <Button
              type="button"
              variant="light"
              onClick={onClose}
              disabled={isUploading}
              className="px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="dark"
              disabled={isUploading}
              className="px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading
                ? "Uploading..."
                : isEditing
                  ? "Save Changes"
                  : "Add Subcategory"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
