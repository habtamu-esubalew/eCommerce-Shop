"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity, clearCart } from "@/store/slices/cartSlice";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { spacing, typography } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.product.price * item.product.discountPercentage * item.quantity) /
        100,
    0
  );
  const total = subtotal - totalDiscount;

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart");
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className={spacing.section}>
          <div className={spacing.container}>
            <div className="max-w-4xl mx-auto space-y-6">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <div className="p-6 rounded-full bg-muted">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                </div>
                <div>
                  <h2 className={typography.heading.h2}>Your cart is empty</h2>
                  <p className="text-muted-foreground mt-2">
                    Start adding products to your cart to see them here
                  </p>
                </div>
                <Link href={ROUTES.HOME}>
                  <Button size="lg">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={spacing.section}>
        <div className={spacing.container}>
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={typography.heading.h1}>Shopping Cart</h1>
                <p className="text-muted-foreground mt-1">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const hasThumbnail =
                    item.product.thumbnail &&
                    item.product.thumbnail.trim() !== "";
                  const originalPrice =
                    item.product.discountPercentage > 0
                      ? item.product.price /
                        (1 - item.product.discountPercentage / 100)
                      : null;
                  const itemTotal =
                    item.product.price * item.quantity -
                    (item.product.price *
                      item.product.discountPercentage *
                      item.quantity) /
                      100;

                  return (
                    <Card key={item.product.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <Link
                            href={ROUTES.PRODUCT_DETAIL(item.product.id)}
                            className="flex-shrink-0"
                          >
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-muted border">
                              {hasThumbnail ? (
                                <Image
                                  src={item.product.thumbnail}
                                  alt={item.product.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 640px) 96px, 128px"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <Package className="h-8 w-8 text-muted-foreground opacity-50" />
                                </div>
                              )}
                            </div>
                          </Link>

                          <div className="flex-1 min-w-0 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={ROUTES.PRODUCT_DETAIL(item.product.id)}
                                >
                                  <h3 className="font-semibold text-base sm:text-lg hover:text-primary transition-colors line-clamp-2">
                                    {item.product.title}
                                  </h3>
                                </Link>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.product.brand} • {item.product.category}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleRemoveItem(item.product.id)
                                }
                                className="flex-shrink-0 h-8 w-8 text-destructive hover:text-destructive"
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between flex-wrap gap-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.product.id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center font-semibold">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                  disabled={
                                    item.quantity >= item.product.stock
                                  }
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="flex flex-col items-end gap-1">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-lg sm:text-xl font-bold">
                                    ${itemTotal.toFixed(2)}
                                  </span>
                                  {originalPrice && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      ${(originalPrice * item.quantity).toFixed(2)}
                                    </span>
                                  )}
                                </div>
                                {item.product.discountPercentage > 0 && (
                                  <Badge
                                    variant="default"
                                    className="bg-green-600 hover:bg-green-700 text-white text-xs"
                                  >
                                    Save $
                                    {(
                                      (originalPrice! - item.product.price) *
                                      item.quantity
                                    ).toFixed(2)}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      {totalDiscount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Discount</span>
                          <span className="font-medium text-green-600">
                            -${totalDiscount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast.error("Please log in to proceed to checkout");
                          router.push(ROUTES.LOGIN);
                          return;
                        }
                        toast.info("Checkout functionality coming soon");
                      }}
                    >
                      Proceed to Checkout
                    </Button>

                    <Link href={ROUTES.HOME} className="block">
                      <Button variant="outline" size="lg" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}


