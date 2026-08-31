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

const initialState: CatalogState = {
  products: storedProducts ? JSON.parse(storedProducts) : products,
  categories,
  subCategories,
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
  },
});

export const { deleteProduct, addProduct, editProduct } = catalogSlice.actions;
export default catalogSlice.reducer;
