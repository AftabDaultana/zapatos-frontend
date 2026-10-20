import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import type { Blog } from "../../../services/blogServices";

interface AdminBlogsProps {
  blogs: Blog[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  onPageChange: (page: number) => void;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
}

export default function AdminBlogs({
  blogs,
  isLoading,
  currentPage,
  totalPages,
  totalBlogs,
  onPageChange,
  onEdit,
  onDelete,
}: AdminBlogsProps) {
  const ITEMS_PER_PAGE = 10;

  const startItem =
    totalBlogs === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalBlogs);

  return (
    <section className="overflow-hidden rounded-2xl bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-225">
          <thead>
            <tr className="border-b border-neutral-300 text-left">
              <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                Image
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                Blog Title
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                Slug
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                Author
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                Created
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-sm text-neutral-500"
                >
                  Loading blogs...
                </td>
              </tr>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b border-neutral-300 last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-14 w-20 rounded-lg object-cover"
                    />
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="max-w-55 truncate text-sm font-medium text-neutral-950 transition hover:text-[#16DBCC]"
                    >
                      {blog.title}
                    </Link>
                  </td>

                  <td className="px-6 py-4 text-sm text-neutral-600">
                    {blog.slug}
                  </td>

                  <td className="px-6 py-4 text-sm text-neutral-600">
                    {typeof blog.author === "object"
                      ? (blog.author?.name ?? "Admin")
                      : blog.author}
                  </td>

                  <td className="px-6 py-4 text-sm text-neutral-600">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-5 text-neutral-500">
                      <Button
                        type="button"
                        variant="none"
                        aria-label={`Edit ${blog.title}`}
                        onClick={() => onEdit(blog)}
                        className="transition hover:text-red-600"
                      >
                        <Pencil size={20} />
                      </Button>

                      <Button
                        type="button"
                        variant="none"
                        aria-label={`Delete ${blog.title}`}
                        onClick={() => onDelete(blog)}
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
                  colSpan={6}
                  className="px-6 py-12 text-center text-sm text-neutral-500"
                >
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalBlogs > 0 && (
          <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-4">
            <p className="text-sm text-neutral-500">
              Showing{" "}
              <span className="font-medium text-neutral-950">{startItem}</span>{" "}
              - <span className="font-medium text-neutral-950">{endItem}</span>{" "}
              of{" "}
              <span className="font-medium text-neutral-950">{totalBlogs}</span>
            </p>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="none"
                disabled={currentPage === 1}
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </Button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <Button
                    key={page}
                    type="button"
                    variant="none"
                    onClick={() => onPageChange(page)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-[#16DBCC] text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {page}
                  </Button>
                ),
              )}

              <Button
                type="button"
                variant="none"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() =>
                  onPageChange(Math.min(currentPage + 1, totalPages))
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
  );
}
