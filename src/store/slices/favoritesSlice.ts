import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push({ ...action.payload, images: [...action.payload.images] });
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index === -1) {
        state.items.push({ ...action.payload, images: [...action.payload.images] });
      } else {
        state.items.splice(index, 1);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;

