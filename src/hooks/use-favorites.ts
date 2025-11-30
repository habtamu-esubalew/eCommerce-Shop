import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite, addToFavorites, removeFromFavorites } from "@/store/slices/favoritesSlice";
import { Product } from "@/types";
import { toast } from "sonner";

export function useFavorites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  const isFavorite = useCallback(
    (productId: number) => {
      return favorites.some((item) => item.id === productId);
    },
    [favorites]
  );

  const toggle = useCallback(
    (product: Product) => {
      dispatch(toggleFavorite(product));
      const wasFavorite = isFavorite(product.id);
      toast.success(
        wasFavorite ? "Removed from favorites" : "Added to favorites"
      );
    },
    [dispatch, isFavorite]
  );

  const add = useCallback(
    (product: Product) => {
      dispatch(addToFavorites(product));
      toast.success("Added to favorites");
    },
    [dispatch]
  );

  const remove = useCallback(
    (productId: number) => {
      dispatch(removeFromFavorites(productId));
      toast.success("Removed from favorites");
    },
    [dispatch]
  );

  return {
    favorites,
    isFavorite,
    toggle,
    add,
    remove,
    count: favorites.length,
  };
}

