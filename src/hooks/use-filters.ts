import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductFilters, SortOption, DEFAULT_FILTERS, DEFAULT_SORT } from "@/types/filters";

interface UseFiltersReturn {
  filters: ProductFilters;
  sort: SortOption;
  updateFilters: (updates: Partial<ProductFilters>) => void;
  updateSort: (sort: SortOption) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

function parseFiltersFromURL(searchParams: URLSearchParams): ProductFilters {
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const minRating = searchParams.get("minRating");
  const brands = searchParams.get("brands");
  const inStock = searchParams.get("inStock");

  return {
    priceRange:
      priceMin && priceMax
        ? { min: Number(priceMin), max: Number(priceMax) }
        : null,
    minRating: minRating ? Number(minRating) : null,
    brands: brands ? brands.split(",") : [],
    inStock: inStock === "true" ? true : inStock === "false" ? false : null,
  };
}

function parseSortFromURL(searchParams: URLSearchParams): SortOption {
  const sort = searchParams.get("sort");
  const validSorts: SortOption[] = [
    "price-asc",
    "price-desc",
    "rating-asc",
    "rating-desc",
    "name-asc",
    "name-desc",
    "newest",
    "oldest",
  ];
  return sort && validSorts.includes(sort as SortOption)
    ? (sort as SortOption)
    : DEFAULT_SORT;
}

function buildSearchParams(
  filters: ProductFilters,
  sort: SortOption,
  existingParams: URLSearchParams
): URLSearchParams {
  const params = new URLSearchParams(existingParams);

  params.delete("priceMin");
  params.delete("priceMax");
  params.delete("minRating");
  params.delete("brands");
  params.delete("inStock");
  params.delete("sort");

  if (filters.priceRange) {
    params.set("priceMin", filters.priceRange.min.toString());
    params.set("priceMax", filters.priceRange.max.toString());
  }

  if (filters.minRating !== null && filters.minRating > 0) {
    params.set("minRating", filters.minRating.toString());
  }

  if (filters.brands.length > 0) {
    params.set("brands", filters.brands.join(","));
  }

  if (filters.inStock !== null) {
    params.set("inStock", filters.inStock.toString());
  }

  if (sort !== DEFAULT_SORT) {
    params.set("sort", sort);
  }

  return params;
}

export function useFilters(): UseFiltersReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseFiltersFromURL(searchParams),
    [searchParams]
  );
  const sort = useMemo(() => parseSortFromURL(searchParams), [searchParams]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.priceRange !== null ||
      filters.minRating !== null ||
      filters.brands.length > 0 ||
      filters.inStock !== null ||
      sort !== DEFAULT_SORT
    );
  }, [filters, sort]);

  const updateFilters = useCallback(
    (updates: Partial<ProductFilters>) => {
      const newFilters: ProductFilters = {
        ...filters,
        ...updates,
      };
      const newParams = buildSearchParams(newFilters, sort, searchParams);
      router.push(`?${newParams.toString()}`, { scroll: false });
    },
    [filters, sort, searchParams, router]
  );

  const updateSort = useCallback(
    (newSort: SortOption) => {
      const newParams = buildSearchParams(filters, newSort, searchParams);
      router.push(`?${newParams.toString()}`, { scroll: false });
    },
    [filters, searchParams, router]
  );

  const resetFilters = useCallback(() => {
    const newParams = buildSearchParams(DEFAULT_FILTERS, DEFAULT_SORT, searchParams);
    const category = searchParams.get("category");
    const q = searchParams.get("q");
    if (category) newParams.set("category", category);
    if (q) newParams.set("q", q);
    router.push(`?${newParams.toString()}`, { scroll: false });
  }, [searchParams, router]);

  return {
    filters,
    sort,
    updateFilters,
    updateSort,
    resetFilters,
    hasActiveFilters,
  };
}

