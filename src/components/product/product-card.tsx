"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Package, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useFavorites } from "@/hooks/use-favorites";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { ROUTES } from "@/lib/constants";
import { effects, transitions } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { isFavorite, toggle } = useFavorites();

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Added to cart");
  };

  const isProductFavorite = isFavorite(product.id);

  const hasThumbnail = product.thumbnail && product.thumbnail.trim() !== "";

  return (
    <Link href={ROUTES.PRODUCT_DETAIL(product.id)} className={cn("block h-full", className)}>
      <Card className={cn("group h-full flex flex-col", effects.card, effects.cardHover)}>
        <CardHeader className="p-0">
          <div className="relative w-full h-56 sm:h-64 overflow-hidden rounded-t-lg bg-muted flex items-center justify-center">
            {hasThumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className={cn("object-cover", effects.imageHover)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
                <Package className="h-12 w-12 mb-2 opacity-50" />
                <span className="text-xs">No Image</span>
              </div>
            )}
            {product.discountPercentage > 0 && (
              <Badge
                variant="default"
                className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-2.5 py-1 shadow-lg border-0"
              >
                -{Math.round(product.discountPercentage)}%
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
              onClick={handleToggleFavorite}
              aria-label={isProductFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isProductFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground",
                  transitions.colors
                )}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-5 space-y-3">
          <h3 className={cn("font-semibold text-lg sm:text-xl line-clamp-2", transitions.colors, "group-hover:text-primary")}>
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground" aria-label={`Category: ${product.category}`}>
              • {product.category}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <div>
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            {product.discountPercentage > 0 && (
              <p className="text-xs text-muted-foreground line-through">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleAddToCart}
              className={transitions.default}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-1.5" />
              Add to Cart
            </Button>
            <Button size="sm" className={transitions.default}>
              View Details
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

