import { useEffect, useState } from "react";
import { addProduct, editProduct } from "../../../app/slices/catalogSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import type { Category } from "../../../data/categories";
import type { SubCategory } from "../../../data/subCategories";
import Button from "../../ui/Button";
import { X } from "lucide-react";
import { selectProducts } from "../../../app/selectors/catalogSelectors";
import type { Product } from "../../../data/products";
import { uploadUniqueFilesToCloudinary } from "../../../utils/cloudinary";

interface AddProductForm {
  name: string;
  slug: string;
  subCategoryId: number[];
  description: string;
  price: string;
  discountedPrice: string;
  quantity: string;
  featured: boolean;
  isNewArrival: boolean;
  isSustainable: boolean;
  isHighTop: boolean;
  specifications: {
    type: string;
    gender: string;
    material: string;
    color: string[];
    sizeRange: string[];
    features: string[];
  };
  images: string[];
}

const initialFormData: AddProductForm = {
  name: "",
  slug: "",
  subCategoryId: [],
  description: "",
  price: "",
  discountedPrice: "",
  quantity: "",
  featured: false,
  isNewArrival: false,
  isSustainable: false,
  isHighTop: false,
  specifications: {
    type: "",
    gender: "",
    material: "",
    color: [],
    sizeRange: [],
    features: [],
  },
  images: [],
};

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  subCategories: SubCategory[];
  product?: Product;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  categories,
  subCategories,
  product,
}: ProductFormModalProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<AddProductForm>(initialFormData);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [featureInput, setFeatureInput] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        subCategoryId: product.subCategoryId,
        description: product.description,
        price: String(product.price),
        discountedPrice:
          product.discountedPrice === product.price
            ? ""
            : String(product.discountedPrice),
        quantity: String(product.quantity),
        featured: product.featured ?? false,
        isNewArrival: product.isNewArrival ?? false,
        isSustainable: product.isSustainable ?? false,
        isHighTop: product.isHighTop ?? false,
        specifications: {
          type: product.specifications.type,
          gender: product.specifications.gender,
          material: product.specifications.material,
          color: product.specifications.color,
          sizeRange: product.specifications.sizeRange,
          features: product.specifications.features,
        },
        images: product.images,
      });

      setImageFiles([]);
      setExistingImages(product.images);
      setImagePreviews(product.images);
      setFeatureInput("");
      setFormErrors([]);

      const category = subCategories.find((subCategory) =>
        product.subCategoryId.includes(subCategory.id),
      );

      setSelectedCategory(category ? String(category.categoryId) : "all");
    } else {
      setFormData(initialFormData);
      setImageFiles([]);
      setExistingImages([]);
      setImagePreviews([]);
      setFeatureInput("");
      setFormErrors([]);
      setSelectedCategory("all");
    }
  }, [product, subCategories]);

  useEffect(() => {
    if (!product && isOpen) {
      setFormData({
        name: "",
        slug: "",
        subCategoryId: [],
        description: "",
        price: "",
        discountedPrice: "",
        quantity: "",
        featured: false,
        isNewArrival: false,
        isSustainable: false,
        isHighTop: false,
        specifications: {
          type: "",
          gender: "",
          material: "",
          color: [],
          sizeRange: [],
          features: [],
        },
        images: [],
      });

      setSelectedCategory("all");
      setFeatureInput("");
      setImageFiles([]);
      setExistingImages([]);
      setImagePreviews([]);
      setFormErrors([]);
    }
  }, [product, isOpen]);

  const products = useAppSelector(selectProducts);

  const isEditMode = Boolean(product);

  const validateFormFields = (): string[] => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Product name is required");
    }

    if (formData.subCategoryId.length === 0) {
      errors.push("At least one subcategory is required.");
    }

    if (!formData.description.trim()) {
      errors.push("Product description is required.");
    }

    if (!formData.specifications.type.trim()) {
      errors.push("Product type is required.");
    }

    if (!formData.specifications.gender.trim()) {
      errors.push("Gender is required.");
    }

    if (!formData.specifications.material.trim()) {
      errors.push("Material is required.");
    }

    if (formData.specifications.color.length === 0) {
      errors.push("At least one color is required.");
    }

    if (formData.specifications.sizeRange.length === 0) {
      errors.push("At least one size is required.");
    }

    if (formData.specifications.features.length === 0) {
      errors.push("At least one feature is required.");
    }

    if (!formData.price.trim() || Number(formData.price) <= 0) {
      errors.push("Price must be greater than 0.");
    }

    if (
      formData.discountedPrice.trim() !== "" &&
      Number(formData.discountedPrice) >= Number(formData.price)
    ) {
      errors.push(
        "Discounted Price should be less than the product's actual price.",
      );
    }

    if (!formData.quantity.trim() || Number(formData.quantity) < 0) {
      errors.push("Quantity cannot be negative.");
    }

    if (imageFiles.length === 0 && imagePreviews.length === 0) {
      errors.push("At least one product image is required.");
    }

    return errors;
  };

  const availableSubCategories =
    selectedCategory === "all"
      ? subCategories
      : subCategories.filter(
          (subCategory) => subCategory.categoryId === Number(selectedCategory),
        );

  const handleSubCategoryChange = (subCategoryId: number) => {
    setFormData((previous) => {
      const alreadySelected = previous.subCategoryId.includes(subCategoryId);

      return {
        ...previous,
        subCategoryId: alreadySelected
          ? previous.subCategoryId.filter((id) => id !== subCategoryId)
          : [...previous.subCategoryId, subCategoryId],
      };
    });
  };

  const nextProductId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-neutral-950">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>

          <Button
            type="button"
            variant="none"
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
            aria-label="Close modal"
          >
            <X size={16} />
          </Button>
        </div>

        {formErrors.length > 0 && (
          <div className="shrink-0 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center justify-between">
              <p className="mb-2 text-sm font-semibold text-red-700">
                Please fix the following:
              </p>
              <X size={16} onClick={() => setFormErrors([])} />
            </div>

            <ul className="list-disc space-y-1 pl-5 text-sm text-red-600">
              {formErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
          <form
            id="product-form"
            onSubmit={async (event) => {
              event.preventDefault();

              const errors = validateFormFields();

              if (errors.length > 0) {
                setFormErrors(errors);
                return;
              }

              setFormErrors([]);

              let newImageUrls: string[];

              try {
                newImageUrls = await uploadUniqueFilesToCloudinary(imageFiles);
              } catch {
                setFormErrors([
                  "Unable to process one or more product images.",
                ]);
                return;
              }

              const imageUrls = [...existingImages, ...newImageUrls];

              const productData = {
                ...formData,
                price: Number(formData.price),
                discountedPrice:
                  formData.discountedPrice.trim() === ""
                    ? Number(formData.price)
                    : Number(formData.discountedPrice),
                quantity: Number(formData.quantity),
                images: imageUrls,
              };

              if (product) {
                dispatch(
                  editProduct({
                    ...product,
                    ...productData,
                    id: product.id,
                    rating: product.rating,
                    ratingCount: product.ratingCount,
                  }),
                );
              } else {
                dispatch(
                  addProduct({
                    ...productData,
                    id: nextProductId,
                    rating: 0,
                    ratingCount: 0,
                  }),
                );
              }

              onClose();
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-neutral-700"
              >
                Product Name
              </label>

              <input
                id="product-name"
                type="text"
                value={formData.name}
                onChange={(event) => {
                  const name = event.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    name,
                    slug: name.toLowerCase().trim().replace(/\s+/g, "-"),
                  }));
                }}
                placeholder="Enter product name"
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-neutral-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product-description"
                className="text-sm font-medium text-neutral-700"
              >
                Product Description
              </label>

              <textarea
                id="product-description"
                value={formData.description}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    description: event.target.value,
                  }))
                }
                placeholder="Enter product description"
                rows={4}
                className="resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-neutral-500"
              />
            </div>
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
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-neutral-500"
              >
                <option value="all">Select Category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-neutral-700">
                Subcategories
              </label>

              <div className="max-h-48 overflow-y-auto rounded-lg border border-neutral-200 p-3">
                {availableSubCategories.length === 0 ? (
                  <p className="text-sm text-neutral-500">
                    No subcategories available.
                  </p>
                ) : (
                  availableSubCategories.map((subCategory) => (
                    <label
                      key={subCategory.id}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-neutral-50"
                    >
                      <input
                        type="checkbox"
                        value={subCategory.id}
                        checked={formData.subCategoryId.includes(
                          subCategory.id,
                        )}
                        onChange={() => handleSubCategoryChange(subCategory.id)}
                        className="h-4 w-4"
                      />

                      <span className="text-sm text-neutral-700">
                        {subCategory.name}
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product-price"
                className="text-sm font-medium text-neutral-700"
              >
                Price
              </label>

              <input
                id="product-price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    price: event.target.value,
                  }))
                }
                placeholder="Enter product price"
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-neutral-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product-discounted-price"
                className="text-sm font-medium text-neutral-700"
              >
                Discounted Price
              </label>

              <input
                id="product-discounted-price"
                type="number"
                min="0"
                value={formData.discountedPrice}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    discountedPrice: event.target.value,
                  }))
                }
                placeholder="Enter discounted price"
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-neutral-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product-quantity"
                className="text-sm font-medium text-neutral-700"
              >
                Quantity
              </label>

              <input
                id="product-quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    quantity: event.target.value,
                  }))
                }
                placeholder="Enter product quantity"
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-neutral-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product-type"
                className="text-sm font-medium text-neutral-700"
              >
                Product Type
              </label>

              <input
                id="product-type"
                type="text"
                value={formData.specifications.type}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    specifications: {
                      ...previous.specifications,
                      type: event.target.value,
                    },
                  }))
                }
                placeholder="Enter product type"
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-neutral-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product-gender"
                className="text-sm font-medium text-neutral-700"
              >
                Gender
              </label>

              <select
                id="product-gender"
                value={formData.specifications.gender}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    specifications: {
                      ...previous.specifications,
                      gender: event.target.value,
                    },
                  }))
                }
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-neutral-500"
              >
                <option value="">Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product-material"
                className="text-sm font-medium text-neutral-700"
              >
                Material
              </label>

              <input
                id="product-material"
                type="text"
                value={formData.specifications.material}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    specifications: {
                      ...previous.specifications,
                      material: event.target.value,
                    },
                  }))
                }
                placeholder="Enter product material"
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-neutral-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-neutral-700">
                Colors
              </label>

              <div className="grid grid-cols-2 gap-2 rounded-lg border border-neutral-200 p-3 sm:grid-cols-3">
                {[
                  "Black",
                  "White",
                  "Red",
                  "Blue",
                  "Green",
                  "Grey",
                  "Brown",
                  "Navy",
                  "Beige",
                ].map((color) => (
                  <label
                    key={color}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.specifications.color.includes(color)}
                      onChange={() =>
                        setFormData((previous) => {
                          const colors = previous.specifications.color;

                          return {
                            ...previous,
                            specifications: {
                              ...previous.specifications,
                              color: colors.includes(color)
                                ? colors.filter((item) => item !== color)
                                : [...colors, color],
                            },
                          };
                        })
                      }
                      className="h-4 w-4"
                    />

                    {color}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-neutral-700">
                Size Range
              </label>

              <div className="grid grid-cols-3 gap-2 rounded-lg border border-neutral-200 p-3 sm:grid-cols-5">
                {[
                  "36",
                  "37",
                  "38",
                  "39",
                  "40",
                  "41",
                  "42",
                  "43",
                  "44",
                  "45",
                ].map((size) => (
                  <label
                    key={size}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.specifications.sizeRange.includes(size)}
                      onChange={() =>
                        setFormData((previous) => {
                          const sizes = previous.specifications.sizeRange;

                          return {
                            ...previous,
                            specifications: {
                              ...previous.specifications,
                              sizeRange: sizes.includes(size)
                                ? sizes.filter((item) => item !== size)
                                : [...sizes, size],
                            },
                          };
                        })
                      }
                      className="h-4 w-4"
                    />

                    {size}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product-feature"
                className="text-sm font-medium text-neutral-700"
              >
                Features
              </label>

              <div className="flex gap-2">
                <input
                  id="product-feature"
                  type="text"
                  value={featureInput}
                  onChange={(event) => setFeatureInput(event.target.value)}
                  placeholder="Enter a product feature"
                  className="min-w-0 flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-neutral-500"
                />

                <Button
                  type="button"
                  variant="dark"
                  onClick={() => {
                    const feature = featureInput.trim();

                    if (!feature) {
                      return;
                    }

                    setFormData((previous) => ({
                      ...previous,
                      specifications: {
                        ...previous.specifications,
                        features: [
                          ...previous.specifications.features,
                          feature,
                        ],
                      },
                    }));

                    setFeatureInput("");
                  }}
                  className="rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
                >
                  Add
                </Button>
              </div>

              {formData.specifications.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.specifications.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product-images"
                className="text-sm font-medium text-neutral-700"
              >
                Product Images
              </label>

              <input
                id="product-images"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.target.files ?? []);

                  const invalidFiles = files.filter(
                    (file) =>
                      !file.type.startsWith("image/") ||
                      file.size > 5 * 1024 * 1024,
                  );

                  if (invalidFiles.length > 0) {
                    setFormErrors([
                      "Each product image must be an image file smaller than 5 MB.",
                    ]);

                    event.target.value = "";
                    return;
                  }

                  setFormErrors([]);

                  setImageFiles((previous) => {
                    const updatedFiles = [...previous, ...files];

                    console.log("New image files:", updatedFiles);

                    return updatedFiles;
                  });

                  const newPreviews = files.map((file) =>
                    URL.createObjectURL(file),
                  );

                  console.log("Image previews:", imagePreviews);

                  setImagePreviews((previous) => [...previous, ...newPreviews]);

                  event.target.value = "";
                }}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-neutral-700"
              />

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {imagePreviews.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="relative overflow-hidden rounded-lg border border-neutral-200"
                    >
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="h-28 w-full object-contain"
                      />

                      <Button
                        type="button"
                        variant="none"
                        onClick={() => {
                          if (index < existingImages.length) {
                            setExistingImages((previous) =>
                              previous.filter(
                                (_, imageIndex) => imageIndex !== index,
                              ),
                            );
                          } else {
                            const newImageIndex = index - existingImages.length;

                            setImageFiles((previous) =>
                              previous.filter(
                                (_, fileIndex) => fileIndex !== newImageIndex,
                              ),
                            );
                          }

                          setImagePreviews((previous) =>
                            previous.filter(
                              (_, imageIndex) => imageIndex !== index,
                            ),
                          );
                        }}
                        className="absolute right-1 top-1 rounded-full bg-neutral-950 px-1 py-1 text-white transition hover:bg-red-600"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                id="product-featured"
                type="checkbox"
                checked={formData.featured}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    featured: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />

              <label
                htmlFor="product-featured"
                className="cursor-pointer text-sm font-medium text-neutral-700"
              >
                Featured Product
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="product-new-arrival"
                type="checkbox"
                checked={formData.isNewArrival}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    isNewArrival: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />

              <label
                htmlFor="product-new-arrival"
                className="cursor-pointer text-sm font-medium text-neutral-700"
              >
                New Arrival
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="product-sustainable"
                type="checkbox"
                checked={formData.isSustainable}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    isSustainable: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />

              <label
                htmlFor="product-sustainable"
                className="cursor-pointer text-sm font-medium text-neutral-700"
              >
                Sustainable Product
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="product-high-top"
                type="checkbox"
                checked={formData.isHighTop}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    isHighTop: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />

              <label
                htmlFor="product-high-top"
                className="cursor-pointer text-sm font-medium text-neutral-700"
              >
                High-Top Product
              </label>
            </div>
          </form>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-3 border-t border-neutral-200 bg-white px-6 py-4">
          <Button
            type="button"
            variant="light"
            onClick={onClose}
            className="rounded-lg border border-neutral-200 bg-white px-5 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="dark"
            form="product-form"
            className="rounded-lg bg-neutral-950 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            {isEditMode ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </div>
    </div>
  );
}
