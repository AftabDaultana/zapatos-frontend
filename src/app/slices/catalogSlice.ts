import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { subCategories } from "../../data/subCategories";

import type { Product } from "../../data/products";
import type { Category } from "../../data/categories";
import type { SubCategory } from "../../data/subCategories";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CatalogState {
  products: Product[];
  categories: Category[];
  subCategories: SubCategory[];
}

const storedProducts = localStorage.getItem("products");
const storedCategories = localStorage.getItem("categories");
const storedSubCategories = localStorage.getItem("subCategories");

const initialState: CatalogState = {
  products: storedProducts ? JSON.parse(storedProducts) : products,
  categories: storedCategories ? JSON.parse(storedCategories) : categories,
  subCategories: storedSubCategories
    ? JSON.parse(storedSubCategories)
    : subCategories,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );

      localStorage.setItem("products", JSON.stringify(state.products));
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id,
      );

      if (index !== -1) {
        state.products[index] = action.payload;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);

      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    editCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id,
      );

      if (index !== -1) {
        state.categories[index] = action.payload;

        localStorage.setItem("categories", JSON.stringify(state.categories));
      }
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;

      state.categories = state.categories.filter(
        (category) => category.id !== categoryId,
      );

      state.subCategories = state.subCategories.filter(
        (subCategory) => subCategory.categoryId !== categoryId,
      );

      localStorage.setItem("categories", JSON.stringify(state.categories));

      localStorage.setItem(
        "subCategories",
        JSON.stringify(state.subCategories),
      );
    },

    addSubCategory: (state, action: PayloadAction<Omit<SubCategory, "id">>) => {
      const nextId =
        state.subCategories.length > 0
          ? Math.max(
              ...state.subCategories.map((subCategory) => subCategory.id),
            ) + 1
          : 1;

      state.subCategories.push({
        id: nextId,
        ...action.payload,
      });

      localStorage.setItem(
        "subCategories",
        JSON.stringify(state.subCategories),
      );
    },

    editSubCategory: (state, action: PayloadAction<SubCategory>) => {
      const index = state.subCategories.findIndex(
        (subCategory) => subCategory.id === action.payload.id,
      );

      if (index !== -1) {
        state.subCategories[index] = action.payload;

        localStorage.setItem(
          "subCategories",
          JSON.stringify(state.subCategories),
        );
      }
    },

    deleteSubCategory: (state, action: PayloadAction<number>) => {
      state.subCategories = state.subCategories.filter(
        (subCategory) => subCategory.id !== action.payload,
      );

      localStorage.setItem(
        "subCategories",
        JSON.stringify(state.subCategories),
      );
    },
  },
});

export const {
  deleteProduct,
  addProduct,
  editProduct,
  addCategory,
  editCategory,
  deleteCategory,
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
} = catalogSlice.actions;
export default catalogSlice.reducer;
