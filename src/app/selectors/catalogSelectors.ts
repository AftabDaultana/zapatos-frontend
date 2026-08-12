import type { RootState } from "../store";

export const selectCategories = (state: RootState) => {
  state.catalog.categories;
};

export const selectProducts = (state: RootState) => {
  state.catalog.products;
};

export const selectSubCategories = (state: RootState) => {
  state.catalog.subCategories;
};

export const selectCategoryBySlug = (
  state: RootState,
  slug: string | undefined,
) => {
  state.catalog.categories.find((category) => category.slug === slug);
};

export const selectSubCategoryBySlug = (
  state: RootState,
  slug: string | undefined,
) => {
  state.catalog.subCategories.find((subCategory) => subCategory.slug === slug);
};

export const selectSubCategoryById = (
  state: RootState,
  id: number | undefined,
) => {
  state.catalog.subCategories.find((subCategory) => subCategory.id === id);
};
