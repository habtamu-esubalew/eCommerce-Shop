"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchProductById,
  deleteProduct,
  clearCurrentProduct,
} from "@/store/slices/productsSlice";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Star,
  Edit,
  Trash2,
  ArrowLeft,
  Loader2,
  Truck,
  Shield,
  RotateCcw,
  Tag,
  Ruler,
  Weight,
  CheckCircle2,
  XCircle,
  FileText,
  Package,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { spacing, typography, layout } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";
import { ProductDetail } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const productId = Number(params.id);
  const { currentProduct, loading, error } = useAppSelector(
    (state) => state.products
  );
  const favorites = useAppSelector((state) => state.favorites.items);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const isFavorite = favorites.some((item) => item.id === productId);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = currentProduct as ProductDetail | null;

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, productId]);

  const handleToggleFavorite = () => {
    if (product) {
      dispatch(toggleFavorite(product));
      toast.success(
        isFavorite ? "Removed from favorites" : "Added to favorites"
      );
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity: 1 }));
      toast.success("Added to cart");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      toast.success("Product deleted successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const calculateOriginalPrice = (price: number, discount: number): number => {
    return price / (1 - discount / 100);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={spacing.section}>
          <div className={spacing.container}>
            <div className="flex items-center justify-center min-h-[60vh]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className={spacing.section}>
          <div className={spacing.container}>
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <p className="text-destructive mb-4">
                {error || "Product not found"}
              </p>
              <Link href="/">
                <Button>Go Back</Button>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const hasThumbnail = product.thumbnail && product.thumbnail.trim() !== "";
  const productImages = product.images && product.images.length > 0
    ? product.images.filter(img => img && img.trim() !== "")
    : [];
  
  const images = productImages.length > 0 
    ? productImages 
    : hasThumbnail 
      ? [product.thumbnail] 
      : [];
  
  const mainImage = images.length > 0 
    ? images[selectedImageIndex] || images[0]
    : null;
  const originalPrice = product.discountPercentage > 0
    ? calculateOriginalPrice(product.price, product.discountPercentage)
    : null;

  return (
    <MainLayout>
      <div className={spacing.section}>
        <div className={spacing.container}>
          <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              <div className="space-y-4">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted border flex items-center justify-center">
                  {mainImage ? (
                    <Image
                      src={mainImage}
                      alt={product.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground p-8">
                      <Package className="h-16 w-16 mb-4 opacity-50" />
                      <span className="text-sm">No Image Available</span>
                    </div>
                  )}
                  {product.discountPercentage > 0 && (
                    <Badge
                      variant="default"
                      className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-3 py-1.5 shadow-lg border-0 z-10"
                    >
                      -{Math.round(product.discountPercentage)}% OFF
                    </Badge>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {images.map((image, index) => (
                      image && image.trim() !== "" && (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={cn(
                            "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                            selectedImageIndex === index
                              ? "border-primary ring-2 ring-primary ring-offset-2"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <Image
                            src={image}
                            alt={`${product.title} ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 25vw, 20vw"
                          />
                        </button>
                      )
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div>
                    <h1 className={typography.heading.h2}>{product.title}</h1>
                    {product.sku && (
                      <p className="text-sm text-muted-foreground mt-1">
                        SKU: {product.sku}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews?.length || 0} reviews)
                      </span>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {product.category}
                    </Badge>
                    {product.brand && (
                      <Badge variant="secondary" className="text-sm">
                        {product.brand}
                      </Badge>
                    )}
                  </div>

                  {product.availabilityStatus && (
                    <div className="flex items-center gap-2">
                      {product.availabilityStatus === "In Stock" ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-medium text-green-500">
                            {product.availabilityStatus}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({product.stock} available)
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-500" />
                          <span className="text-sm font-medium text-red-500">
                            {product.availabilityStatus}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                    {originalPrice && (
                      <>
                        <span className="text-2xl text-muted-foreground line-through">
                          ${originalPrice.toFixed(2)}
                        </span>
                        <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white">
                          Save ${(originalPrice - product.price).toFixed(2)}
                        </Badge>
                      </>
                    )}
                  </div>
                  {product.minimumOrderQuantity && (
                    <p className="text-sm text-muted-foreground">
                      Minimum order: {product.minimumOrderQuantity} units
                    </p>
                  )}
                </div>

                {product.tags && product.tags.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-full h-12 text-base font-semibold"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <div className="flex gap-2 w-full">
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={handleToggleFavorite}
                      className={cn(
                        "flex-1 h-11",
                        isFavorite && "bg-primary/10 border-primary text-primary hover:bg-primary/20"
                      )}
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5 mr-2",
                          isFavorite && "fill-primary text-primary"
                        )}
                      />
                      <span className="hidden sm:inline">
                        {isFavorite ? "Favorited" : "Add to Favorites"}
                      </span>
                      <span className="sm:hidden">
                        {isFavorite ? "Favorited" : "Favorite"}
                      </span>
                    </Button>
                    
                    {isAuthenticated && (
                      <>
                        <Link href={`/product/${productId}/edit`}>
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="h-11 px-4"
                          >
                            <Edit className="h-4 w-4 mr-1.5" />
                            <span className="hidden md:inline">Edit</span>
                          </Button>
                        </Link>
                        <Button
                          size="lg"
                          variant="destructive"
                          onClick={() => setDeleteDialogOpen(true)}
                          className="h-11 px-4"
                        >
                          <Trash2 className="h-4 w-4 mr-1.5" />
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
                  <TabsTrigger value="details" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Details
                  </TabsTrigger>
                  {product.reviews && product.reviews.length > 0 && (
                    <TabsTrigger value="reviews" className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Reviews ({product.reviews.length})
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="details" className="mt-6 px-6 pb-6">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Description</h3>
                      <p className="text-muted-foreground leading-relaxed text-[15px]">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-6">
                      <h3 className="text-lg font-semibold mb-5">Product Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">SKU</span>
                          <span className="text-sm font-mono">{product.sku || "N/A"}</span>
                        </div>
                        {product.brand && (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Brand</span>
                            <span className="text-sm">{product.brand}</span>
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</span>
                          <span className="text-sm capitalize">{product.category}</span>
                        </div>
                        {product.weight && (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Weight</span>
                            <span className="text-sm">{product.weight} kg</span>
                          </div>
                        )}
                        {product.dimensions && (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Dimensions</span>
                            <span className="text-sm">
                              {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                            </span>
                          </div>
                        )}
                        {product.minimumOrderQuantity && (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Minimum Order</span>
                            <span className="text-sm">{product.minimumOrderQuantity} units</span>
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Stock</span>
                          <span className="text-sm">{product.stock} available</span>
                        </div>
                      </div>
                    </div>

                    {(product.shippingInformation || product.warrantyInformation || product.returnPolicy) && (
                      <div className="pt-6">
                        <h3 className="text-lg font-semibold mb-5">Shipping & Policies</h3>
                        <div className="space-y-4">
                          {product.shippingInformation && (
                            <div className="flex items-start gap-3">
                              <Truck className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">Shipping</span>
                                <span className="text-sm">{product.shippingInformation}</span>
                              </div>
                            </div>
                          )}
                          {product.warrantyInformation && (
                            <div className="flex items-start gap-3">
                              <Shield className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">Warranty</span>
                                <span className="text-sm">{product.warrantyInformation}</span>
                              </div>
                            </div>
                          )}
                          {product.returnPolicy && (
                            <div className="flex items-start gap-3">
                              <RotateCcw className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">Return Policy</span>
                                <span className="text-sm">{product.returnPolicy}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  </TabsContent>

                {product.reviews && product.reviews.length > 0 && (
                  <TabsContent value="reviews" className="mt-6 px-6 pb-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          Customer Reviews ({product.reviews.length})
                        </h3>
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg font-semibold">{product.rating}</span>
                          <span className="text-sm text-muted-foreground">average rating</span>
                        </div>
                      </div>
                      <div className="space-y-6">
                        {product.reviews.map((review, index) => (
                          <div
                            key={index}
                            className="border-b border-border pb-6 last:border-0 last:pb-0"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="space-y-1">
                                <p className="font-semibold">{review.reviewerName}</p>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={cn(
                                          "h-4 w-4",
                                          i < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-muted-foreground"
                                        )}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDate(review.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </Card>

          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{product.title}"? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
