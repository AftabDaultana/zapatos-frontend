import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CatalogFiltersState {
  types: string[];
  sizes: string[];
  colors: string[];
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
}

const initialState: CatalogFiltersState = {
  types: [],
  sizes: [],
  colors: [],
  minPrice: null,
  maxPrice: null,
  minRating: null,
};

const catalogFiltersSlice = createSlice({
  name: "catalogFilters",
  initialState,
  reducers: {
    toggleType: (state, action: PayloadAction<string>) => {
      const type = action.payload;

      if (state.types.includes(type)) {
        state.types = state.types.filter((item) => item !== type);
      } else {
        state.types.push(type);
      }
    },

    toggleSize: (state, action: PayloadAction<string>) => {
      const size = action.payload;

      if (state.sizes.includes(size)) {
        state.sizes = state.sizes.filter((item) => item !== size);
      } else {
        state.sizes.push(size);
      }
    },

    toggleColor: (state, action: PayloadAction<string>) => {
      const color = action.payload;

      if (state.colors.includes(color)) {
        state.colors = state.colors.filter((item) => item !== color);
      } else {
        state.colors.push(color);
      }
    },

    setPriceRange: (
      state,
      action: PayloadAction<{
        minPrice: number | null;
        maxPrice: number | null;
      }>,
    ) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },

    setMinRating: (state, action: PayloadAction<number | null>) => {
      state.minRating = action.payload;
    },

    clearAllFilters: (state) => {
      state.types = [];
      state.sizes = [];
      state.colors = [];
      state.minPrice = null;
      state.maxPrice = null;
      state.minRating = null;
    },
  },
});

export const {
  toggleType,
  toggleSize,
  toggleColor,
  setPriceRange,
  setMinRating,
  clearAllFilters,
} = catalogFiltersSlice.actions;
export default catalogFiltersSlice.reducer;
