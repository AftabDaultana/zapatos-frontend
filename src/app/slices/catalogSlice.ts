import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { subCategories } from "../../data/subCategories";

import type { Product } from "../../data/products";
import type { Category } from "../../data/categories";
import type { SubCategory } from "../../data/subCategories";

interface CatalogState {
  products: Product[];
  categories: Category[];
  subCategories: SubCategory[];
}

const initialState: CatalogState = {
  products,
  categories,
  subCategories,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
});

export default catalogSlice.reducer;
