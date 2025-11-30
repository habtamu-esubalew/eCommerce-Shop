export const API_BASE_URL = "https://dummyjson.com" as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  DEFAULT_SKIP: 0,
} as const;

export const ROUTES = {
  HOME: "/",
  FAVORITES: "/favorites",
  CART: "/cart",
  LOGIN: "/login",
  PRODUCT_DETAIL: (id: number) => `/products/${id}`,
  PRODUCT_EDIT: (id: number) => `/products/${id}/edit`,
  PRODUCT_CREATE: "/products/create",
} as const;

export const STORAGE_KEYS = {
  THEME: "theme",
  USER: "user",
} as const;

export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  INFO: 3000,
} as const;

