"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Heart, Plus, Home, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { ROUTES } from "@/lib/constants";
import { transitions } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MobileMenuProps {
  readonly isAuthenticated: boolean;
}

export function MobileMenu({ isAuthenticated }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const favoritesCount = useAppSelector(
    (state) => state.favorites.items.length
  );

  const isActive = (href: string) => pathname === href;

  const handleLinkClick = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setOpen(false);
  };

  const menuItems = [
    {
      label: "Products",
      href: ROUTES.HOME,
      icon: <Home className="h-5 w-5" />,
    },
    ...(isAuthenticated
      ? [
          {
            label: "Favorites",
            href: ROUTES.FAVORITES,
            icon: <Heart className="h-5 w-5" />,
            badge: favoritesCount > 0 ? favoritesCount : undefined,
          },
          {
            label: "Create Product",
            href: ROUTES.PRODUCT_CREATE,
            icon: <Plus className="h-5 w-5" />,
          },
        ]
      : []),
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-10 w-10",
            transitions.colors,
            "hover:bg-accent/50"
          )}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 sm:w-96 p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-[calc(100vh-73px)] overflow-y-auto">
          {isAuthenticated && user && (
            <div className="px-6 py-4 border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{user.username}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-1 px-4 py-4">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "default" : "ghost"}
                className={cn(
                  "justify-start h-auto py-3 px-4",
                  transitions.colors,
                  "hover:bg-accent/50"
                )}
                onClick={() => handleLinkClick(item.href)}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="text-base flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold">
                    {item.badge}
                  </span>
                )}
              </Button>
            ))}
          </nav>

          {isAuthenticated && (
            <div className="mt-auto px-4 py-4 border-t">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start h-auto py-3 px-4",
                  "text-destructive hover:text-destructive",
                  "hover:bg-destructive/10",
                  transitions.colors
                )}
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span className="text-base">Sign Out</span>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
