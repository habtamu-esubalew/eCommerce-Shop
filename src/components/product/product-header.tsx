"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductSort } from "./product-sort";
import { ProductFilters as ProductFiltersType, SortOption } from "@/types/filters";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/tailwind-utils";

interface ProductHeaderProps {
  title: string;
  subtitle?: string;
  totalProducts: number;
  filteredProducts: number;
  hasActiveFilters: boolean;
  filters: ProductFiltersType;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onRemoveFilter: (filterType: keyof ProductFiltersType, value?: string | number) => void;
  onClearAllFilters: () => void;
  className?: string;
}

export function ProductHeader({
  title,
  subtitle,
  totalProducts,
  filteredProducts,
  hasActiveFilters,
  filters,
  sort,
  onSortChange,
  onRemoveFilter,
  onClearAllFilters,
  className,
}: ProductHeaderProps) {
  const activeFilterChips: Array<{ label: string; onRemove: () => void }> = [];

  if (filters.priceRange) {
    activeFilterChips.push({
      label: `$${filters.priceRange.min} - $${filters.priceRange.max}`,
      onRemove: () => onRemoveFilter("priceRange"),
    });
  }

  if (filters.minRating !== null && filters.minRating > 0) {
    activeFilterChips.push({
      label: `${filters.minRating}+ Stars`,
      onRemove: () => onRemoveFilter("minRating"),
    });
  }

  filters.brands.forEach((brand) => {
    activeFilterChips.push({
      label: brand,
      onRemove: () => onRemoveFilter("brands", brand),
    });
  });

  if (filters.inStock !== null) {
    activeFilterChips.push({
      label: filters.inStock ? "In Stock" : "Out of Stock",
      onRemove: () => onRemoveFilter("inStock"),
    });
  }

  return (
    <div className={cn("space-y-4 pb-4 border-b border-border/60", className)}>
      <div className="space-y-1">
        <h1 className={typography.heading.h1}>{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredProducts}</span> of{" "}
            <span className="font-semibold text-foreground">{totalProducts}</span> products
          </p>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAllFilters}
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all filters
            </Button>
          )}
        </div>
        <div className="hidden lg:flex items-center">
          <ProductSort value={sort} onValueChange={onSortChange} />
        </div>
      </div>

      {activeFilterChips.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border/40">
          <span className="text-xs font-medium text-muted-foreground">Active filters:</span>
          {activeFilterChips.map((chip, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="h-7 px-3 text-xs font-normal gap-1.5 hover:bg-secondary/80 transition-colors"
            >
              {chip.label}
              <button
                onClick={chip.onRemove}
                className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
                aria-label={`Remove ${chip.label} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

