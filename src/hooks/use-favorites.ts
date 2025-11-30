import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite, addToFavorites, removeFromFavorites } from "@/store/slices/favoritesSlice";
import { Product } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function useFavorites() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const favorites = useAppSelector((state) => state.favorites.items);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const isFavorite = useCallback(
    (productId: number) => {
      return favorites.some((item) => item.id === productId);
    },
    [favorites]
  );

  const toggle = useCallback(
    (product: Product) => {
      if (!isAuthenticated) {
        toast.error("Please log in to add items to favorites");
        router.push(ROUTES.LOGIN);
        return;
      }
      
      dispatch(toggleFavorite(product));
      const wasFavorite = isFavorite(product.id);
      toast.success(
        wasFavorite ? "Removed from favorites" : "Added to favorites"
      );
    },
    [dispatch, isFavorite, isAuthenticated, router]
  );

  const add = useCallback(
    (product: Product) => {
      if (!isAuthenticated) {
        toast.error("Please log in to add items to favorites");
        router.push(ROUTES.LOGIN);
        return;
      }
      
      dispatch(addToFavorites(product));
      toast.success("Added to favorites");
    },
    [dispatch, isAuthenticated, router]
  );

  const remove = useCallback(
    (productId: number) => {
      if (!isAuthenticated) {
        toast.error("Please log in to manage favorites");
        router.push(ROUTES.LOGIN);
        return;
      }
      
      dispatch(removeFromFavorites(productId));
      toast.success("Removed from favorites");
    },
    [dispatch, isAuthenticated, router]
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

