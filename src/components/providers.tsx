"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { setTheme } from "@/store/slices/themeSlice";
import { initializeCart } from "@/store/slices/cartSlice";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        store.dispatch(setTheme(stored));
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = prefersDark ? "dark" : "light";
        store.dispatch(setTheme(initialTheme));
      }
      store.dispatch(initializeCart());
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}

