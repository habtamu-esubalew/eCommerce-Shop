import { useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProducts,
  setSearchQuery,
  fetchProductById,
} from "@/store/slices/productsSlice";
import { PAGINATION } from "@/lib/constants";
import { toast } from "sonner";

interface UseProductsOptions {
  skip?: number;
  limit?: number;
  search?: string;
  category?: string;
  autoFetch?: boolean;
}

export function useProducts(options: UseProductsOptions = {}) {
  const {
    skip = PAGINATION.DEFAULT_SKIP,
    limit = PAGINATION.DEFAULT_LIMIT,
    search = "",
    category = "",
    autoFetch = true,
  } = options;

  const dispatch = useAppDispatch();
  const { items, loading, error, total, skip: currentSkip, limit: currentLimit, searchQuery } =
    useAppSelector((state) => state.products);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadProducts = useCallback(
    async (params?: { skip?: number; limit?: number; search?: string; category?: string }) => {
      const fetchParams = {
        skip: params?.skip ?? skip,
        limit: params?.limit ?? limit,
        search: params?.search ?? search,
        category: params?.category ?? category,
      };

      try {
        await dispatch(fetchProducts(fetchParams)).unwrap();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load products";
        toast.error(errorMessage);
        throw err;
      }
    },
    [dispatch, skip, limit, search, category]
  );

  const loadMore = useCallback(async () => {
    if (currentSkip + currentLimit >= total || isLoadingMore || loading) {
      return;
    }

    setIsLoadingMore(true);
    try {
      await dispatch(
        fetchProducts({
          skip: currentSkip + currentLimit,
          limit: currentLimit,
          search: searchQuery,
          category: category,
        })
      ).unwrap();
    } catch (err) {
      toast.error("Failed to load more products");
    } finally {
      setIsLoadingMore(false);
    }
  }, [dispatch, currentSkip, currentLimit, total, searchQuery, category, isLoadingMore, loading]);

  const searchProducts = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
      loadProducts({ skip: 0, limit, search: query });
    },
    [dispatch, loadProducts, limit]
  );

  useEffect(() => {
    if (autoFetch) {
      loadProducts({ search, category });
    }
  }, [autoFetch, search, category]);

  return {
    products: items,
    loading,
    error,
    isLoadingMore,
    total,
    hasMore: currentSkip + currentLimit < total,
    loadProducts,
    loadMore,
    searchProducts,
    searchQuery,
  };
}

export function useProduct(productId: number | null) {
  const dispatch = useAppDispatch();
  const { currentProduct, loading, error } = useAppSelector(
    (state) => state.products
  );

  const loadProduct = useCallback(async () => {
    if (!productId) return;

    try {
      await dispatch(fetchProductById(productId)).unwrap();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load product";
      toast.error(errorMessage);
      throw err;
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId, loadProduct]);

  return {
    product: currentProduct,
    loading,
    error,
    loadProduct,
  };
}

