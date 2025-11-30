"use client";

import { useAppSelector } from "@/store/hooks";
import { Logo } from "./logo";
import { SearchBar } from "./search-bar";
import { UserMenu } from "./user-menu";
import { MobileMenu } from "./mobile-menu";
import { spacing } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";

export function Header() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40 shadow-sm backdrop-blur-md bg-background/95 supports-[backdrop-filter]:bg-background/80 overflow-hidden">
      <div
        className={cn(
          spacing.container,
          "flex items-center gap-1 sm:gap-2 lg:gap-4",
          "h-14 sm:h-16 lg:h-20",
          "transition-all duration-200",
          "min-w-0"
        )}
      >
        <div className="flex-shrink-0 lg:hidden">
          <MobileMenu isAuthenticated={isAuthenticated} />
        </div>

        <div className="flex-shrink-0 min-w-0">
          <Logo className="scale-90 sm:scale-95 lg:scale-100" />
        </div>

        <div className="hidden lg:flex flex-1 min-w-0 max-w-4xl mx-2 lg:mx-4">
          <SearchBar showCategory={true} />
        </div>

        <div className="flex-shrink-0 flex items-center gap-1 ml-auto">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
