import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Button from "../../../components/ui/Button";
import AlertModal from "../../../components/ui/AlertModal";
import AdminBlogs from "../../../components/admin/AdminBlogs/AdminBlogs";
import BlogFormModal from "../../../components/admin/AdminBlogs/BlogFormModal";
import {
  deleteBlog,
  getAllBlogs,
  type Blog,
} from "../../../services/blogServices";

export default function AdminListBlogs() {
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlogFormModalOpen, setIsBlogFormModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAllBlogs(currentPage, ITEMS_PER_PAGE);

      setBlogs(result.blogs);
      setTotalBlogs(result.pagination.total);
      setTotalPages(Math.ceil(result.pagination.total / ITEMS_PER_PAGE));
    } catch {
      setError("Unable to load blogs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    void fetchBlogs();
  }, [fetchBlogs]);

  const handleConfirmDelete = async () => {
    if (!blogToDelete) return;

    try {
      await deleteBlog(blogToDelete._id);
      setBlogToDelete(null);

      if (blogs.length === 1 && currentPage > 1) {
        setCurrentPage((page) => page - 1);
      } else {
        await fetchBlogs();
      }
    } catch {
      setError("Unable to delete the blog. Please try again.");
      setBlogToDelete(null);
    }
  };

  return (
    <main className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">BLOGS</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your blog posts.
          </p>
        </div>

        <Button
          type="button"
          variant="dark"
          onClick={() => {
            setSelectedBlog(null);
            setIsBlogFormModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition"
        >
          <Plus size={18} />
          Add Blog
        </Button>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <AdminBlogs
        blogs={blogs}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalBlogs={totalBlogs}
        onPageChange={setCurrentPage}
        onEdit={(blog) => {
          setSelectedBlog(blog);
          setIsBlogFormModalOpen(true);
        }}
        onDelete={setBlogToDelete}
      />

      <BlogFormModal
        isOpen={isBlogFormModalOpen}
        onClose={() => setIsBlogFormModalOpen(false)}
        blog={selectedBlog}
        onSuccess={fetchBlogs}
      />

      <AlertModal
        isOpen={blogToDelete !== null}
        type="confirmation"
        title="Delete Blog"
        message={
          blogToDelete
            ? `Are you sure you want to delete "${blogToDelete.title}"?`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onClose={() => setBlogToDelete(null)}
      />
    </main>
  );
}
