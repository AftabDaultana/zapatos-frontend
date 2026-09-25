import api from "../api/axios";

export interface SubCategory {
  _id: string;
  categoryId: string;
  name: string;
  slug: string;
  image: string;
}

export interface createSubcategoryData {
  categoryName: string;
  name: string;
  slug: string;
  image: File;
}

export interface PaginatedSubcategoriesResponse {
  subCategories: SubCategory[];
  pagination: {
    page: number;
    limit: number;
    totalSubCategories: number;
    totalPages: number;
  };
}

export interface UpdateSubcategoryData {
  categoryName?: string;
  name?: string;
  slug?: string;
  image?: File;
}

export const createSubCategory = async (data: createSubcategoryData) => {
  const formData = new FormData();

  formData.append("categoryName", data.categoryName);
  formData.append("name", data.name);
  formData.append("slug", data.slug);
  formData.append("image", data.image);

  const response = await api.post("/subcategories/admin", formData);
  return response.data;
};

export const getAllSubCategories = async (
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedSubcategoriesResponse> => {
  const response = await api.get("/subcategories/admin", {
    params: {
      page,
      limit,
    },
  });

  return {
    subCategories: response.data.data.subCategories,
    pagination: response.data.data.pagination,
  };
};

export const updateSubCategory = async (
  id: string,
  data: UpdateSubcategoryData,
) => {
  const formData = new FormData();

  if (data.categoryName !== undefined) {
    formData.append("categoryName", data.categoryName);
  }

  if (data.name !== undefined) {
    formData.append("name", data.name);
  }

  if (data.slug !== undefined) {
    formData.append("slug", data.slug);
  }

  if (data.image !== undefined) {
    formData.append("image", data.image);
  }

  const response = await api.put(`/subcategories/admin/${id}`, formData);

  return response.data;
};

export const getSubCategoriesByCategoryId = async (
  categoryId: string,
): Promise<SubCategory[]> => {
  const response = await api.get(`/subcategories/category/${categoryId}`);
  return response.data.data;
};

export const deleteSubCategory = async (id: string) => {
  const response = await api.delete(`/subcategories/admin/${id}`);
  return response.data;
};
