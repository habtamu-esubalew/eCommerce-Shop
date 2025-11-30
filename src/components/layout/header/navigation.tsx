"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { transitions } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";

interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon?: React.ReactNode;
}

interface NavigationProps {
  readonly items: readonly NavItem[];
  readonly className?: string;
}

/**
 * Professional Navigation Component
 * Clean horizontal navigation with active state indicators
 */
export function Navigation({ items, className }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === ROUTES.HOME) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav 
      className={cn(
        "flex items-center gap-1 overflow-x-auto",
        "scrollbar-hide", // Hide scrollbar but keep functionality
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={active ? "default" : "ghost"}
              size="sm"
              className={cn(
                transitions.colors,
                "h-9 px-4 whitespace-nowrap",
                active && "shadow-sm",
                "hover:bg-accent/50"
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.icon && (
                <span className="mr-2" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
