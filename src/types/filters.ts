export type SortOption =
  | "price-asc"
  | "price-desc"
  | "rating-asc"
  | "rating-desc"
  | "name-asc"
  | "name-desc"
  | "newest"
  | "oldest";

export interface SortConfig {
  option: SortOption;
  label: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface ProductFilters {
  priceRange: PriceRange | null;
  minRating: number | null;
  brands: string[];
  inStock: boolean | null;
}

export interface FilterState {
  filters: ProductFilters;
  sort: SortOption;
}

export const SORT_OPTIONS: readonly SortConfig[] = [
  { option: "newest", label: "Newest First" },
  { option: "oldest", label: "Oldest First" },
  { option: "price-asc", label: "Price: Low to High" },
  { option: "price-desc", label: "Price: High to Low" },
  { option: "rating-desc", label: "Rating: High to Low" },
  { option: "rating-asc", label: "Rating: Low to High" },
  { option: "name-asc", label: "Name: A to Z" },
  { option: "name-desc", label: "Name: Z to A" },
] as const;

export const DEFAULT_FILTERS: ProductFilters = {
  priceRange: null,
  minRating: null,
  brands: [],
  inStock: null,
};

export const DEFAULT_SORT: SortOption = "newest";

