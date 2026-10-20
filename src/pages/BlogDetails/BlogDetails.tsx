import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogBySlug, type Blog } from "../../services/blogServices";

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getBlogBySlug(slug);
        setBlog(data);
      } catch {
        setError("Unable to load this blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return <p className="py-12 text-center">Loading blog...</p>;
  }

  if (error || !blog) {
    return <p className="py-12 text-center">{error ?? "Blog not found."}</p>;
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-semibold md:text-5xl">{blog.title}</h1>

      <p className="mb-6 text-sm text-neutral-500">
        By {blog.author?.name ?? "Author"}{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <img
        src={blog.image}
        alt={blog.title}
        className="mb-8 w-full max-h-40 xl:max-h-100 lg:max-h-80  rounded-lg object-cover"
      />

      <div className="whitespace-pre-wrap leading-8 text-neutral-800">
        {blog.content}
      </div>
    </article>
  );
}
