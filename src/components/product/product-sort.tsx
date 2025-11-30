"use client";

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS, SortOption } from "@/types/filters";
import { cn } from "@/lib/utils";

interface ProductSortProps {
  value: SortOption;
  onValueChange: (value: SortOption) => void;
  className?: string;
  compact?: boolean;
}

export function ProductSort({ value, onValueChange, className, compact = false }: ProductSortProps) {
  const selectedLabel = useMemo(() => {
    return SORT_OPTIONS.find((option) => option.option === value)?.label || "Sort by";
  }, [value]);

  if (compact) {
    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id="product-sort-mobile"
          className="w-[140px] h-10"
          aria-label="Sort products"
        >
          <SelectValue placeholder="Sort">
            {selectedLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.option} value={option.option}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label htmlFor="product-sort" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
        Sort by:
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id="product-sort"
          className="w-[180px] sm:w-[200px]"
          aria-label="Sort products"
        >
          <SelectValue placeholder="Sort by">
            {selectedLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.option} value={option.option}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

