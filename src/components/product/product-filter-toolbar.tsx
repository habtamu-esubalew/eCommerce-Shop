"use client";

import { ProductFilters } from "./product-filters";
import { ProductSort } from "./product-sort";
import { ProductFilters as ProductFiltersType, SortOption } from "@/types/filters";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductFilterToolbarProps {
  filters: ProductFiltersType;
  sort: SortOption;
  products: readonly Product[];
  onFiltersChange: (filters: Partial<ProductFiltersType>) => void;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  className?: string;
}

export function ProductFilterToolbar({
  filters,
  sort,
  products,
  onFiltersChange,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
  className,
}: ProductFilterToolbarProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", className)}>
      <ProductFilters
        filters={filters}
        products={products}
        onFiltersChange={onFiltersChange}
        onReset={onResetFilters}
        hasActiveFilters={hasActiveFilters}
      />
      <ProductSort value={sort} onValueChange={onSortChange} />
    </div>
  );
}

