import api from "../api/axios";

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  author: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedBlogsResponse {
  blogs: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export const getAllBlogs = async (
  page: number = 1,
  limit: number = 6,
): Promise<PaginatedBlogsResponse> => {
  const response = await api.get("/blogs", {
    params: { page, limit },
  });

  return {
    blogs: response.data.data,
    pagination: response.data.pagination,
  };
};

export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  const response = await api.get(`/blogs/${slug}`);

  return response.data.data;
};

export const createBlog = async (data: {
  title: string;
  slug: string;
  content: string;
  image: File;
}) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("slug", data.slug);
  formData.append("content", data.content);
  formData.append("image", data.image);

  const response = await api.post("/blogs/admin", formData);

  return response.data;
};

export const updateBlog = async (
  id: string,
  data: {
    title?: string;
    slug?: string;
    content?: string;
    image?: File;
  },
) => {
  const formData = new FormData();

  if (data.title !== undefined) formData.append("title", data.title);
  if (data.slug !== undefined) formData.append("slug", data.slug);
  if (data.content !== undefined) formData.append("content", data.content);
  if (data.image !== undefined) formData.append("image", data.image);

  const response = await api.put(`/blogs/admin/${id}`, formData);

  return response.data;
};

export const deleteBlog = async (id: string) => {
  const response = await api.delete(`/blogs/admin/${id}`);

  return response.data;
};
