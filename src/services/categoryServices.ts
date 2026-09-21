import api from "../api/axios";

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface createCategoryData {
  name: string;
  slug: string;
}

export interface PaginatedCategoriesResponse {
  categories: Category[];
  pagination: {
    page: number;
    limit: number;
    totalCategories: number;
    totalPages: number;
  };
}

export const createCategory = async (data: createCategoryData) => {
  const response = await api.post("/categories/admin", data);

  return response.data;
};

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories");
  return response.data.data;
};

export const getAllPaginatedCategories = async (
  page: number = 1,
  limit: number = 5,
): Promise<PaginatedCategoriesResponse> => {
  const response = await api.get("/categories/admin", {
    params: {
      page,
      limit,
    },
  });

  return {
    categories: response.data.data,
    pagination: response.data.pagination,
  };
};

export const updateCategory = async (id: string, data: createCategoryData) => {
  const response = api.put(`/categories/admin/${id}`, data);
  return (await response).data;
};

export const deleteCategory = async (id: string) => {
  const response = await api.delete(`/categories/admin/${id}`);
  return response.data;
};
