"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Heart, 
  LogOut, 
  LogIn, 
  ShoppingCart,
  Plus,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";
import { logout } from "@/store/slices/authSlice";
import { toast } from "sonner";
import { ROUTES } from "@/lib/constants";
import { transitions } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function UserMenu() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { mode } = useAppSelector((state) => state.theme);
  const favoritesCount = useAppSelector(
    (state) => state.favorites.items.length
  );
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Unauthenticated State - Cart + Theme Toggle + Login Button
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-1">
        <Link href={ROUTES.CART} className="flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "relative h-9 w-9 sm:h-10 sm:w-10",
              transitions.colors,
              "hover:bg-accent/50",
              "border border-border/50 hover:border-primary/50"
            )}
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Button>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleThemeToggle}
          className={cn(
            "h-9 w-9 sm:h-10 sm:w-10",
            transitions.colors,
            "hover:bg-accent/50",
            "border border-border/50 hover:border-primary/50"
          )}
          aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {mode === "dark" ? (
            <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </Button>

        <Link href={ROUTES.LOGIN} className="flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 sm:h-10 sm:w-10",
              transitions.colors,
              "hover:bg-accent/50",
              "border border-border/50 hover:border-primary/50"
            )}
            aria-label="Sign in to your account"
            title="Sign in to your account"
          >
            <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Link>
      </div>
    );
  }

  // Authenticated State - Full Menu
  return (
    <div className="flex items-center gap-1">
      <Link href={ROUTES.PRODUCT_CREATE} className="hidden md:block">
        <Button
          variant="default"
          size="sm"
          className={cn(
            "h-9 px-3",
            transitions.colors,
            "font-medium"
          )}
        >
          <Plus className="h-4 w-4 mr-1.5" />
          <span className="hidden lg:inline">Create</span>
        </Button>
      </Link>

      <Link href={ROUTES.FAVORITES} className="flex-shrink-0 hidden sm:block">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative h-9 w-9 sm:h-10 sm:w-10",
            transitions.colors,
            "hover:bg-accent/50",
            "border border-border/50 hover:border-primary/50"
          )}
          aria-label={`Favorites (${favoritesCount} items)`}
        >
          <Heart className={cn(
            "h-4 w-4 sm:h-5 sm:w-5",
            favoritesCount > 0 && "fill-primary text-primary"
          )} />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">
              {favoritesCount > 9 ? "9+" : favoritesCount}
            </span>
          )}
        </Button>
      </Link>

      <Link href={ROUTES.CART} className="flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative h-9 w-9 sm:h-10 sm:w-10",
            transitions.colors,
            "hover:bg-accent/50",
            "border border-border/50 hover:border-primary/50"
          )}
          aria-label="Shopping cart"
        >
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </Button>
      </Link>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleThemeToggle}
        className={cn(
          "h-9 w-9 sm:h-10 sm:w-10",
          transitions.colors,
          "hover:bg-accent/50",
          "border border-border/50 hover:border-primary/50"
        )}
        aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {mode === "dark" ? (
          <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
          <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 sm:h-10 sm:w-10",
              transitions.colors,
              "hover:bg-accent/50",
              "border border-border/50 hover:border-primary/50"
            )}
            aria-label={`Account menu for ${user?.username || "User"}`}
            title={user?.username || "Account"}
          >
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-64 shadow-lg border-2"
        >
          <DropdownMenuLabel className="px-4 py-3">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-base">{user?.username}</span>
              <span className="text-xs text-muted-foreground font-normal">
                {user?.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <Link href={ROUTES.FAVORITES}>
            <DropdownMenuItem className="cursor-pointer">
              <Heart className="h-4 w-4 mr-2" />
              <span>My Favorites</span>
              {favoritesCount > 0 && (
                <span className="ml-auto text-xs font-semibold text-primary">
                  {favoritesCount}
                </span>
              )}
            </DropdownMenuItem>
          </Link>
          
          <Link href={ROUTES.PRODUCT_CREATE} className="md:hidden">
            <DropdownMenuItem className="cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              <span>Create Product</span>
            </DropdownMenuItem>
          </Link>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleLogout} 
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
