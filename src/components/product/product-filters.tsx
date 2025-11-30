"use client";

import { useState, useMemo, useEffect } from "react";
import { X, Filter, Star, DollarSign, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProductFilters as ProductFiltersType, PriceRange } from "@/types/filters";
import { Product } from "@/types";
import { getUniqueBrands, getPriceRange } from "@/lib/filter-utils";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  filters: ProductFiltersType;
  products: readonly Product[];
  onFiltersChange: (filters: Partial<ProductFiltersType>) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  className?: string;
  mobileOnly?: boolean;
}

export function ProductFilters({
  filters,
  products,
  onFiltersChange,
  onReset,
  hasActiveFilters,
  className,
  mobileOnly = false,
}: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([0, 10000]);

  const availableBrands = useMemo(() => getUniqueBrands(products), [products]);
  const productPriceRange = useMemo(() => getPriceRange(products), [products]);

  useEffect(() => {
    if (productPriceRange.max > 0) {
      const max = Math.ceil(productPriceRange.max);
      setPriceRange([0, max]);
      setLocalPriceRange([0, max]);
    }
  }, [productPriceRange]);

  useEffect(() => {
    if (filters.priceRange) {
      setLocalPriceRange([filters.priceRange.min, filters.priceRange.max]);
    } else {
      setLocalPriceRange([priceRange[0], priceRange[1]]);
    }
  }, [filters.priceRange, priceRange]);

  const handlePriceRangeChange = (values: number[]) => {
    if (values.length === 2) {
      setLocalPriceRange([values[0], values[1]]);
    }
  };

  const applyPriceRange = () => {
    onFiltersChange({
      priceRange: {
        min: localPriceRange[0],
        max: localPriceRange[1],
      },
    });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ brands: newBrands });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      minRating: filters.minRating === rating ? null : rating,
    });
  };

  const handleStockChange = (inStock: boolean | null) => {
    onFiltersChange({
      inStock: filters.inStock === inStock ? null : inStock,
    });
  };

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-2.5">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Price Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={localPriceRange[0]}
              onChange={(e) => {
                const min = Math.max(0, Number(e.target.value));
                setLocalPriceRange([min, localPriceRange[1]]);
              }}
              className="h-9"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={localPriceRange[1]}
              onChange={(e) => {
                const max = Math.max(localPriceRange[0], Number(e.target.value));
                setLocalPriceRange([localPriceRange[0], max]);
              }}
              className="h-9"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={applyPriceRange}
            className="w-full"
          >
            Apply Price Range
          </Button>
          {filters.priceRange && (
            <p className="text-xs text-muted-foreground">
              ${filters.priceRange.min} - ${filters.priceRange.max}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2.5">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Star className="h-4 w-4" />
            Minimum Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm font-normal cursor-pointer flex items-center gap-1"
              >
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {rating}+ Stars
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {availableBrands.length > 0 && (
        <Card>
          <CardHeader className="pb-2.5">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Package className="h-4 w-4" />
              Brands
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[160px] overflow-y-auto">
            {availableBrands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => handleBrandToggle(brand)}
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2.5">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Package className="h-4 w-4" />
            Availability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock === true}
              onCheckedChange={() => handleStockChange(true)}
            />
            <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
              In Stock
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="out-of-stock"
              checked={filters.inStock === false}
              onCheckedChange={() => handleStockChange(false)}
            />
            <Label htmlFor="out-of-stock" className="text-sm font-normal cursor-pointer">
              Out of Stock
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const filterCount = [
    filters.priceRange ? 1 : 0,
    filters.minRating ? 1 : 0,
    filters.brands.length,
    filters.inStock !== null ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  if (mobileOnly) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="h-10 w-10 flex-shrink-0 relative" 
            aria-label="Open filters"
          >
            <Filter className="h-5 w-5" />
            {filterCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">
                {filterCount > 9 ? "9+" : filterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 flex flex-col max-h-screen">
          <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4 pb-12">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      <aside className={cn("hidden lg:block w-64 shrink-0", className)}>
        <div className="sticky top-4">
          <FilterContent />
        </div>
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden" aria-label="Open filters">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {filterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 flex flex-col max-h-screen">
          <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4 pb-12">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

