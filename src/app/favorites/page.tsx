"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ProductCard } from "@/components/product/product-card";
import { ProductCardSkeleton } from "@/components/product/product-card-skeleton";
import { useAppSelector } from "@/store/hooks";
import { Heart } from "lucide-react";
import { spacing, typography, layout } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <MainLayout>
      <div className={spacing.section}>
        <div className={spacing.container}>
          <div className="space-y-6 lg:space-y-8">
            {/* Header Section */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-3">
                <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <h1 className={cn(typography.heading.h2, "font-semibold")}>
                  My Favorites
                </h1>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground pl-10 sm:pl-11">
                {favorites.length === 0
                  ? "You haven't added any favorites yet"
                  : `You have ${favorites.length} ${favorites.length === 1 ? "item" : "items"} in your favorites`}
              </p>
            </div>

            {/* Content Section */}
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground mb-6 opacity-50" />
                <h2 className={typography.heading.h3}>No favorites yet</h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Start adding products to your favorites by clicking the heart
                  icon on any product!
                </p>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto">
                <div className={layout.grid.products}>
                  {favorites.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

