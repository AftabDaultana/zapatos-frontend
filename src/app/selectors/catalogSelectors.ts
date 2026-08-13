import type { RootState } from "../store";

export const selectProductsByFilters = (
  state: RootState,
  products: RootState["catalog"]["products"],
) => {
  const { types, sizes, colors, minPrice, maxPrice, minRating } =
    state.catalogFilters;

  return products.filter((product) => {
    if (types.length > 0 && !types.includes(product.specifications.type)) {
      return false;
    }

    if (
      sizes.length > 0 &&
      !product.specifications.sizeRange.some((size) => sizes.includes(size))
    ) {
      return false;
    }

    if (
      colors.length > 0 &&
      !product.specifications.color.some((color) => colors.includes(color))
    ) {
      return false;
    }

    if (minRating !== null && product.rating < minRating) {
      return false;
    }

    if (minPrice !== null && product.discountedPrice < minPrice) {
      return false;
    }

    if (maxPrice !== null && product.discountedPrice > maxPrice) {
      return false;
    }

    return true;
  });
};

export const selectCategories = (state: RootState) => {
  return state.catalog.categories;
};

export const selectProducts = (state: RootState) => {
  return state.catalog.products;
};

export const selectSubCategories = (state: RootState) => {
  return state.catalog.subCategories;
};

export const selectCategoryBySlug = (
  state: RootState,
  slug: string | undefined,
) => {
  return state.catalog.categories.find((category) => category.slug === slug);
};

export const selectSubCategoryBySlug = (
  state: RootState,
  slug: string | undefined,
) => {
  return state.catalog.subCategories.find(
    (subCategory) => subCategory.slug === slug,
  );
};

export const selectSubCategoriesByCategoryId = (
  state: RootState,
  categoryId: number | undefined,
) => {
  if (categoryId === undefined) {
    return [];
  }
  return state.catalog.subCategories.filter(
    (subCategory) => subCategory.categoryId === categoryId,
  );
};

export const selectProductsBySubCategoryId = (
  state: RootState,
  subCategoryId: number | undefined,
) => {
  if (subCategoryId === undefined) return [];
  return state.catalog.products.filter((product) =>
    product.subCategoryId.includes(subCategoryId),
  );
};

export const selectProductsByCategoryId = (
  state: RootState,
  categoryId: number | undefined,
) => {
  if (categoryId === undefined) return [];
  const subCategoryIds = state.catalog.subCategories
    .filter((subCategory) => subCategory.categoryId === categoryId)
    .map((subCategory) => subCategory.id);

  return state.catalog.products.filter((product) =>
    product.subCategoryId.some((id) => subCategoryIds.includes(id)),
  );
};

export const selectCatalogFilters = (state: RootState) => {
  return state.catalogFilters;
};

export const selectSelectedColors = (state: RootState) => {
  return state.catalogFilters.colors;
};

export const selectSelectedTypes = (state: RootState) => {
  return state.catalogFilters.types;
};

export const selectSelectedSizes = (state: RootState) => {
  return state.catalogFilters.sizes;
};

export const selectSelectedMinPrice = (state: RootState) => {
  return state.catalogFilters.minPrice;
};

export const selectSelectedMaxPrice = (state: RootState) => {
  return state.catalogFilters.maxPrice;
};

export const selectSelectedMinRating = (state: RootState) => {
  return state.catalogFilters.minRating;
};

export const selectAvailableTypes = (state: RootState) => {
  return Array.from(
    new Set(
      state.catalog.products.map((product) => product.specifications.type),
    ),
  );
};

export const selectAvailableSizes = (state: RootState) => {
  return Array.from(
    new Set(
      state.catalog.products.flatMap(
        (product) => product.specifications.sizeRange,
      ),
    ),
  );
};

export const selectAvailableColors = (state: RootState) => {
  return Array.from(
    new Set(
      state.catalog.products.flatMap((product) => product.specifications.color),
    ),
  );
};

export const selectPriceRange = (state: RootState) => {
  const prices = state.catalog.products.map(
    (product) => product.discountedPrice,
  );

  if (prices.length === 0) {
    return {
      min: null,
      max: null,
    };
  }
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

export const selectMinPrice = (state: RootState) =>
  state.catalogFilters.minPrice;

export const selectMaxPrice = (state: RootState) =>
  state.catalogFilters.maxPrice;

export const selectAvailableRatings = (state: RootState) => {
  return Array.from(
    new Set(
      state.catalog.products.map((product) => Math.floor(product.rating)),
    ),
  ).sort((a, b) => b - a);
};
