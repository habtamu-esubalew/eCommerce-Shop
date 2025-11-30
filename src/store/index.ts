import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import favoritesReducer from "./slices/favoritesSlice";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    theme: themeReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

