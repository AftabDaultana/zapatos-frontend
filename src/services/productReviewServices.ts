import api from "../api/axios";

export interface ProductReview {
  _id: string;
  heading: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  status: "unapproved" | "approved" | "rejected";
  customerId: string | { _id: string; name: string };
  productId: string | { _id: string; name: string; slug: string };
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProductReviewsResponse {
  productReviews: ProductReview[];
  pagination: {
    page: number;
    limit: number;
    totalProductReviews: number;
    totalPages: number;
  };
}

export const createProductReview = async (
  productId: string,
  data: {
    heading: string;
    content: string;
    rating: 1 | 2 | 3 | 4 | 5;
  },
): Promise<ProductReview> => {
  const response = await api.post(`/product-reviews/${productId}`, data);

  return response.data.data;
};

export const updateProductReview = async (
  id: string,
  data: {
    heading?: string;
    content?: string;
    rating?: 1 | 2 | 3 | 4 | 5;
  },
): Promise<ProductReview> => {
  const response = await api.put(`/product-review/user/${id}`, data);

  return response.data.data;
};

export const getProductReviews = async (
  productId: string,
  page: number = 1,
  limit: number = 6,
): Promise<PaginatedProductReviewsResponse> => {
  const response = await api.get(`/product-reviews/${productId}`, {
    params: { page, limit },
  });

  return response.data.data;
};

export const updateProductReviewStatus = async (
  id: string,
  status: ProductReview["status"],
): Promise<ProductReview> => {
  const response = await api.patch(`/product-reviews/admin/status/${id}`, {
    status,
  });

  return response.data.data;
};

export const getAllProductReviews = async (
  page: number,
  limit: number,
): Promise<PaginatedProductReviewsResponse> => {
  const response = await api.get("/product-reviews/admin", {
    params: { page, limit },
  });

  return response.data.data;
};

export const getCurrentUserProductReviews = async (
  page: number,
  limit: number,
): Promise<PaginatedProductReviewsResponse> => {
  const response = await api.get(`/product-reviews/user`, {
    params: { page, limit },
  });

  return response.data.data;
};

export const deleteProductReview = async (id: string) => {
  const response = await api.delete(`/product-reviews/${id}`);

  return response.data;
};
