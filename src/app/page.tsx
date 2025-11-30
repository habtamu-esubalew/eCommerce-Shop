"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { ProductCardSkeleton } from "@/components/product/product-card-skeleton";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductHeader } from "@/components/product/product-header";
import { ProductSort } from "@/components/product/product-sort";
import { MainLayout } from "@/components/layout/main-layout";
import { SearchBar } from "@/components/layout/header/search-bar";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Search } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useFilters } from "@/hooks/use-filters";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { applyFiltersAndSort } from "@/lib/filter-utils";
import { layout, spacing, typography } from "@/lib/tailwind-utils";
import { PAGINATION } from "@/lib/constants";
import { isValidCategory } from "@/lib/category-utils";
import { useCategoryName } from "@/hooks/use-category-name";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const category = categoryParam && typeof categoryParam === "string" ? categoryParam : "";
  const searchQuery = searchParams.get("q") || "";
  
  const categoryName = useCategoryName(category);
  
  const {
    products: allProducts,
    loading,
    error,
    isLoadingMore,
    hasMore,
    loadMore,
  } = useProducts({
    limit: PAGINATION.DEFAULT_LIMIT,
    search: searchQuery,
    category: category,
    autoFetch: true,
  });

  const { filters, sort, updateFilters, updateSort, resetFilters, hasActiveFilters } = useFilters();

  const filteredAndSortedProducts = useMemo(() => {
    return applyFiltersAndSort(allProducts, filters, sort);
  }, [allProducts, filters, sort]);

  const { sentinelRef } = useInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore || loading,
    onLoadMore: loadMore,
  });

  const skeletons = useMemo(
    () => Array.from({ length: PAGINATION.DEFAULT_LIMIT }, (_, i) => i),
    []
  );

  return (
    <MainLayout>
      <div className={spacing.section}>
        <div className={spacing.container}>
          <div className="space-y-6">
            <div className="lg:hidden pb-4 border-b border-border/60 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <SearchBar showCategory={false} variant="compact" />
                </div>
                <ProductFilters
                  filters={filters}
                  products={allProducts}
                  onFiltersChange={updateFilters}
                  onReset={resetFilters}
                  hasActiveFilters={hasActiveFilters}
                  mobileOnly={true}
                />
              </div>
              <div className="flex justify-end">
                <ProductSort value={sort} onValueChange={updateSort} compact={true} />
              </div>
            </div>

            <ProductHeader
              title={
                isValidCategory(category) && categoryName
                  ? `${categoryName} Products`
                  : "All Products"
              }
              subtitle={
                searchQuery
                  ? `Search results for "${searchQuery}"${isValidCategory(category) && categoryName ? ` in ${categoryName}` : ""}`
                  : isValidCategory(category) && categoryName
                  ? categoryName
                  : undefined
              }
              totalProducts={allProducts.length}
              filteredProducts={filteredAndSortedProducts.length}
              hasActiveFilters={hasActiveFilters}
              filters={filters}
              sort={sort}
              onSortChange={updateSort}
              onRemoveFilter={(filterType, value) => {
                if (filterType === "priceRange") {
                  updateFilters({ priceRange: null });
                } else if (filterType === "minRating") {
                  updateFilters({ minRating: null });
                } else if (filterType === "brands" && typeof value === "string") {
                  updateFilters({
                    brands: filters.brands.filter((b) => b !== value),
                  });
                } else if (filterType === "inStock") {
                  updateFilters({ inStock: null });
                }
              }}
              onClearAllFilters={resetFilters}
            />

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <ProductFilters
                filters={filters}
                products={allProducts}
                onFiltersChange={updateFilters}
                onReset={resetFilters}
                hasActiveFilters={hasActiveFilters}
                mobileOnly={false}
              />

              <div className="flex-1 space-y-4">
                {error && (
                  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                    <p className="text-destructive text-lg font-medium">
                      {typeof error === "string" ? error : String(error)}
                    </p>
                    <Button onClick={() => window.location.reload()}>
                      Try Again
                    </Button>
                  </div>
                )}

                {loading && allProducts.length === 0 && (
                  <div className={layout.grid.products}>
                    {skeletons.map((i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                  </div>
                )}

                {!loading && allProducts.length === 0 && !error && (
                  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                    <Search className="h-16 w-16 text-muted-foreground" />
                    <div>
                      <h2 className={typography.heading.h3}>No products found</h2>
                      <p className="text-muted-foreground mt-2">
                        {searchQuery
                          ? "Try adjusting your search terms"
                          : "No products available at the moment"}
                      </p>
                    </div>
                  </div>
                )}

                {!loading && allProducts.length > 0 && filteredAndSortedProducts.length === 0 && (
                  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                    <Search className="h-16 w-16 text-muted-foreground" />
                    <div>
                      <h2 className={typography.heading.h3}>No products match your filters</h2>
                      <p className="text-muted-foreground mt-2">
                        Try adjusting your filters or clearing them to see more products
                      </p>
                      <Button onClick={resetFilters} variant="outline" className="mt-4">
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                )}

                {filteredAndSortedProducts.length > 0 && (
                  <>
                    <div className="max-w-7xl mx-auto">
                      <div className={layout.grid.products}>
                        {filteredAndSortedProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>

                    {hasMore && (
                      <div ref={sentinelRef} className="flex justify-center py-8">
                        {isLoadingMore && (
                          <Loader2 className="h-6 w-6 animate-spin text-primary" aria-label="Loading more products" />
                        )}
                      </div>
                    )}

                    {hasMore && !isLoadingMore && (
                      <div className="flex justify-center py-4">
                        <Button onClick={loadMore} variant="outline">
                          Load More
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

