"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { transitions } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";

interface SecondaryNavProps {
  readonly className?: string;
}

/**
 * Secondary Navigation Component
 * Category-based navigation similar to Amazon's department menu
 */
const categories = [
  { label: "All Products", href: ROUTES.HOME, category: null },
  { label: "Electronics", href: `${ROUTES.HOME}?category=electronics`, category: "electronics" },
  { label: "Fashion", href: `${ROUTES.HOME}?category=fashion`, category: "fashion" },
  { label: "Home & Garden", href: `${ROUTES.HOME}?category=home`, category: "home" },
  { label: "Sports", href: `${ROUTES.HOME}?category=sports`, category: "sports" },
  { label: "Books", href: `${ROUTES.HOME}?category=books`, category: "books" },
] as const;

export function SecondaryNav({ className }: SecondaryNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const isActive = (category: string | null) => {
    if (category === null) {
      return pathname === ROUTES.HOME && !activeCategory;
    }
    return activeCategory === category;
  };

  return (
    <nav
      className={cn(
        "flex items-center gap-6 px-4 py-3",
        "bg-muted/30 border-b border-border/40",
        "overflow-x-auto scrollbar-hide",
        className
      )}
      role="navigation"
      aria-label="Category navigation"
    >
      <div className={cn(
        "container mx-auto flex items-center gap-6",
        "min-w-max"
      )}>
        {categories.map((item) => {
          const active = isActive(item.category);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium whitespace-nowrap",
                transitions.colors,
                active
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
