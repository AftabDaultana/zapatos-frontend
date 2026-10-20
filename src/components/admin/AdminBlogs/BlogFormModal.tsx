import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../../ui/Button";
import type { Blog } from "../../../services/blogServices";
import { createBlog, updateBlog } from "../../../services/blogServices";

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog?: Blog | null;
  onSuccess: () => void | Promise<void>;
}

interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  image: File | null;
}

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function BlogFormModal({
  isOpen,
  onClose,
  blog,
  onSuccess,
}: BlogFormModalProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    content: "",
    image: null,
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(blog);

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      title: blog?.title ?? "",
      slug: blog?.slug ?? "",
      content: blog?.content ?? "",
      image: null,
    });

    setFormErrors([]);
    setIsSubmitting(false);
  }, [isOpen, blog]);

  if (!isOpen) return null;

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: slugify(value),
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.title.trim()) {
      errors.push("Blog title is required.");
    }

    if (!formData.slug.trim()) {
      errors.push("Blog slug is required.");
    }

    if (!formData.content.trim()) {
      errors.push("Blog content is required.");
    }

    if (!isEditing && !formData.image) {
      errors.push("Blog image is required.");
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

    setIsSubmitting(true);
    setFormErrors([]);

    try {
      const data = {
        title: formData.title.trim(),
        slug: slugify(formData.slug),
        content: formData.content.trim(),
      };

      if (blog) {
        await updateBlog(blog._id, {
          ...data,
          ...(formData.image ? { image: formData.image } : {}),
        });
      } else if (formData.image) {
        await createBlog({
          ...data,
          image: formData.image,
        });
      }

      await onSuccess();
      onClose();
    } catch {
      setFormErrors([
        "Unable to save the blog. Please check the details and try again.",
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-form-title"
    >
      <div className="max-h-full w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div>
            <h2
              id="blog-form-title"
              className="text-xl font-semibold text-neutral-950"
            >
              {isEditing ? "Edit Blog" : "Add Blog"}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {isEditing
                ? "Update the blog details below."
                : "Create a new blog post."}
            </p>
          </div>

          <Button
            type="button"
            onClick={onClose}
            aria-label="Close blog form"
            variant="none"
            className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6">
          {formErrors.length > 0 && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              <ul className="list-inside list-disc space-y-1">
                {formErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label
              htmlFor="blog-title"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              Blog Title
            </label>

            <input
              id="blog-title"
              type="text"
              value={formData.title}
              onChange={(event) => handleTitleChange(event.target.value)}
              placeholder="Enter blog title"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            />
          </div>

          <div>
            <label
              htmlFor="blog-slug"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              Slug
            </label>

            <input
              id="blog-slug"
              type="text"
              value={formData.slug}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  slug: event.target.value,
                }))
              }
              placeholder="blog-title"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            />

            <p className="mt-2 text-xs text-neutral-500">
              Used in the blog URL.
            </p>
          </div>

          <div>
            <label
              htmlFor="blog-content"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              Content
            </label>

            <textarea
              id="blog-content"
              rows={7}
              value={formData.content}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  content: event.target.value,
                }))
              }
              placeholder="Write your blog content..."
              className="w-full resize-y rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            />
          </div>

          {isEditing && blog?.image && (
            <div>
              <p className="mb-2 text-sm font-medium text-neutral-950">
                Current Image
              </p>
              <img
                src={blog.image}
                alt={blog.title}
                className="h-40 w-full rounded-lg object-cover"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="blog-image"
              className="mb-2 block text-sm font-medium text-neutral-950"
            >
              {isEditing ? "Replace Image (Optional)" : "Blog Image"}
            </label>

            <input
              id="blog-image"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  image: event.target.files?.[0] ?? null,
                }))
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-700 file:mr-4 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:text-sm file:font-medium"
            />

            {formData.image && (
              <p className="mt-2 text-xs text-neutral-500">
                Selected: {formData.image.name}
              </p>
            )}
          </div>

          <div className="mt-2 flex justify-end gap-3 border-t border-neutral-200 pt-5">
            <Button
              type="button"
              onClick={onClose}
              variant="none"
              disabled={isSubmitting}
              className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="dark"
              disabled={isSubmitting}
              className="px-5 py-3 text-sm font-medium"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Add Blog"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
