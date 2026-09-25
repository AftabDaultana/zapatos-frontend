import api from "../api/axios";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  subCategoryId: string[];
  description: string;
  rating: number;
  ratingCount: number;
  price: number;
  discountedPrice: number;
  quantity: number;
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

export interface PaginatedProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    totalProducts: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  type?: string;
  rating?: number;
}

export interface CreateProductData {
  name: string;
  slug: string;
  subCategoryId: string[];
  description: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  featured?: boolean;
  isNewArrival?: boolean;
  isSustainable?: boolean;
  isHighTop?: boolean;
  specifications: {
    type: string;
    gender: string;
    material: string;
    color: string[];
    sizeRange: string[];
    features: string[];
  };
  images: File[];
}

export interface UpdateProductData {
  name?: string;
  slug?: string;
  subCategoryId?: string[];
  description?: string;
  price?: number;
  discountedPrice?: number;
  quantity?: number;
  featured?: boolean;
  isNewArrival?: boolean;
  isSustainable?: boolean;
  isHighTop?: boolean;
  specifications?: {
    type?: string;
    gender?: string;
    material?: string;
    color?: string[];
    sizeRange?: string[];
    features?: string[];
  };
  images?: File[];
}

export const getAllProducts = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  isNewArrival?: boolean,
  featured?: boolean,
  isSustainable?: boolean,
  isHighTop?: boolean,
  stock?: string,
  categoryId?: string,
  subCategoryId?: string,
  rating?: number,
  minPrice?: number,
  maxPrice?: number,
): Promise<PaginatedProductsResponse> => {
  const response = await api.get("/products", {
    params: {
      page,
      limit,
      ...(search ? { search } : {}),
      ...(isNewArrival !== undefined && { isNewArrival }),
      ...(featured !== undefined && { featured }),
      ...(isSustainable !== undefined && { isSustainable }),
      ...(isHighTop !== undefined && { isHighTop }),
      ...(stock !== undefined && { stock }),
      ...(categoryId !== undefined && { categoryId }),
      ...(subCategoryId !== undefined && { subCategoryId }),
      ...(rating !== undefined && { rating }),
      ...(minPrice !== undefined && { minPrice }),
      ...(maxPrice !== undefined && { maxPrice }),
    },
  });

  return {
    products: response.data.data.products,
    pagination: response.data.data.pagination,
  };
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);

  return response.data.data;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await api.get(`/products/slug/${slug}`);

  return response.data.data;
};

export const getProductsByCategoryId = async (
  categoryId: string,
  filters: ProductFilters = {},
): Promise<PaginatedProductsResponse> => {
  const response = await api.get(`/products/category/${categoryId}`, {
    params: {
      page: filters.page ?? 1,
      limit: filters.limit ?? 10,
      ...(filters.minPrice !== undefined && {
        minPrice: filters.maxPrice,
      }),
      ...(filters.maxPrice !== undefined && {
        maxPrice: filters.maxPrice,
      }),
      ...(filters.sizes?.length && {
        sizes: filters.sizes,
      }),
      ...(filters.colors?.length && {
        colors: filters.colors,
      }),
      ...(filters.type && {
        type: filters.type,
      }),
      ...(filters.rating !== undefined && {
        rating: filters.rating,
      }),
    },
  });

  return {
    products: response.data.data.products,
    pagination: response.data.data.pagination,
  };
};

export const getProductsBySubCategoryId = async (
  subCategoryId: string,
  filters: ProductFilters = {},
): Promise<PaginatedProductsResponse> => {
  const response = await api.get(`/products/subcategory/${subCategoryId}`, {
    params: {
      page: filters.page ?? 1,
      limit: filters.limit ?? 10,
      ...(filters.minPrice !== undefined && {
        minPrice: filters.minPrice,
      }),
      ...(filters.maxPrice !== undefined && {
        maxPrice: filters.maxPrice,
      }),
      ...(filters.sizes?.length && {
        size: filters.sizes,
      }),
      ...(filters.colors?.length && {
        color: filters.colors,
      }),
      ...(filters.type && {
        type: filters.type,
      }),
      ...(filters.rating !== undefined && {
        rating: filters.rating,
      }),
    },
  });

  return {
    products: response.data.data.products,
    pagination: response.data.data.pagination,
  };
};

export const createProduct = async (data: CreateProductData) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("slug", data.slug);
  formData.append("description", data.description);
  formData.append("price", String(data.price));
  formData.append("discountedPrice", String(data.discountedPrice));
  formData.append("quantity", String(data.quantity));

  formData.append("featured", String(data.featured ?? false));
  formData.append("isNewArrival", String(data.isNewArrival ?? false));
  formData.append("isSustainable", String(data.isSustainable ?? false));
  formData.append("isHighTop", String(data.isHighTop ?? false));

  data.subCategoryId.forEach((id) => {
    formData.append("subCategoryId", id);
  });

  formData.append("specifications", JSON.stringify(data.specifications));

  data.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await api.post("/products/admin", formData);

  return response.data;
};

export const updateProduct = async (id: string, data: UpdateProductData) => {
  const formData = new FormData();

  if (data.name !== undefined) {
    formData.append("name", data.name);
  }

  if (data.slug !== undefined) {
    formData.append("slug", data.slug);
  }

  if (data.subCategoryId !== undefined) {
    data.subCategoryId.forEach((id) => {
      formData.append("subCategoryId", id);
    });
  }

  if (data.description !== undefined) {
    formData.append("description", data.description);
  }

  if (data.price !== undefined) {
    formData.append("price", String(data.price));
  }

  if (data.discountedPrice !== undefined) {
    formData.append("discountedPrice", String(data.discountedPrice));
  }

  if (data.quantity !== undefined) {
    formData.append("quantity", String(data.quantity));
  }

  if (data.featured !== undefined) {
    formData.append("featured", String(data.featured));
  }

  if (data.isNewArrival !== undefined) {
    formData.append("isNewArrival", String(data.isNewArrival));
  }

  if (data.isSustainable !== undefined) {
    formData.append("isSustainable", String(data.isSustainable));
  }

  if (data.isHighTop !== undefined) {
    formData.append("isHighTop", String(data.isHighTop));
  }

  if (data.specifications !== undefined) {
    formData.append("specifications", JSON.stringify(data.specifications));
  }

  if (data.images !== undefined) {
    data.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  const response = await api.put(`/products/admin/${id}`, formData);

  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/admin/${id}`);

  return response.data;
};
