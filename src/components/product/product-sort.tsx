"use client";

import { useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
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
          className={cn(
            "w-full sm:w-[160px] h-11",
            "bg-background border-border/60",
            "hover:border-primary/50 hover:bg-accent/50",
            "transition-all duration-200",
            "shadow-sm hover:shadow-md",
            "text-sm font-medium",
            "px-3 gap-2"
          )}
          aria-label="Sort products"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
            <SelectValue placeholder="Sort" className="flex-1 min-w-0 text-left truncate" />
          </div>
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

