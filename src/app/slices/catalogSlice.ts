import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { subCategories } from "../../data/subCategories";

import type { Product } from "../../services/productServices";
import type { Category } from "../../services/categoryServices";
import type { SubCategory } from "../../services/subcategoryServices";
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
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload,
      );

      localStorage.setItem("products", JSON.stringify(state.products));
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id,
      );

      if (index !== -1) {
        state.products[index] = action.payload;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },

    addSubCategory: (state, action: PayloadAction<SubCategory>) => {
      state.subCategories.push({
        ...action.payload,
      });

      localStorage.setItem(
        "subCategories",
        JSON.stringify(state.subCategories),
      );
    },

    editSubCategory: (state, action: PayloadAction<SubCategory>) => {
      const index = state.subCategories.findIndex(
        (subCategory) => subCategory._id === action.payload._id,
      );

      if (index !== -1) {
        state.subCategories[index] = action.payload;

        localStorage.setItem(
          "subCategories",
          JSON.stringify(state.subCategories),
        );
      }
    },

    deleteSubCategory: (state, action: PayloadAction<string>) => {
      state.subCategories = state.subCategories.filter(
        (subCategory) => subCategory._id !== action.payload,
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
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
} = catalogSlice.actions;
export default catalogSlice.reducer;
