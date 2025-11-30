import { Product } from "@/types";
import { ProductFilters, SortOption, PriceRange } from "@/types/filters";

export function applyFilters(products: readonly Product[], filters: ProductFilters): Product[] {
  let filtered = [...products];

  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    filtered = filtered.filter((product) => {
      const price = product.price;
      return price >= min && price <= max;
    });
  }

  if (filters.minRating !== null && filters.minRating > 0) {
    filtered = filtered.filter((product) => product.rating >= filters.minRating!);
  }

  if (filters.brands.length > 0) {
    filtered = filtered.filter((product) => filters.brands.includes(product.brand));
  }

  if (filters.inStock !== null) {
    filtered = filtered.filter((product) => {
      if (filters.inStock) {
        return product.stock > 0;
      }
      return product.stock === 0;
    });
  }

  return filtered;
}

export function sortProducts(products: readonly Product[], sortOption: SortOption): Product[] {
  const sorted = [...products];

  switch (sortOption) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating-asc":
      return sorted.sort((a, b) => a.rating - b.rating);
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "newest":
      return sorted.sort((a, b) => b.id - a.id);
    case "oldest":
      return sorted.sort((a, b) => a.id - b.id);
    default:
      return sorted;
  }
}

export function getUniqueBrands(products: readonly Product[]): string[] {
  const brands = new Set<string>();
  products.forEach((product) => {
    if (product.brand) {
      brands.add(product.brand);
    }
  });
  return Array.from(brands).sort();
}

export function getPriceRange(products: readonly Product[]): PriceRange {
  if (products.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function applyFiltersAndSort(
  products: readonly Product[],
  filters: ProductFilters,
  sortOption: SortOption
): Product[] {
  const filtered = applyFilters(products, filters);
  return sortProducts(filtered, sortOption);
}

