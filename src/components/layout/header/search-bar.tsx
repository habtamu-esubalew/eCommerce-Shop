"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery } from "@/store/slices/productsSlice";
import { CategorySelector } from "./category-selector";
import { ROUTES } from "@/lib/constants";
import { transitions } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string, category?: string | null) => void;
  variant?: "default" | "compact";
  showCategory?: boolean;
}

/**
 * Professional Search Bar Component
 * BeliBeli-inspired design with integrated category selector
 * Clean, unified search experience
 */
export function SearchBar({ 
  className, 
  onSearch, 
  variant = "default",
  showCategory = true 
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.products);
  const selectedCategory = searchParams.get("category");

  // Sync with Redux state
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    
    dispatch(setSearchQuery(trimmedQuery));
    
    if (onSearch) {
      onSearch(trimmedQuery, selectedCategory);
    } else {
      // Navigate with search query and category
      const params = new URLSearchParams();
      if (trimmedQuery) {
        params.set("q", trimmedQuery);
      }
      if (selectedCategory) {
        params.set("category", selectedCategory);
      }
      const queryString = params.toString();
      router.push(queryString ? `${ROUTES.HOME}?${queryString}` : ROUTES.HOME);
    }
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery("");
    dispatch(setSearchQuery(""));
    inputRef.current?.focus();
  };

  const isCompact = variant === "compact";
  const hasQuery = query.length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full flex items-center",
        isCompact ? "max-w-md" : "max-w-4xl",
        className
      )}
      role="search"
    >
      <div
        className={cn(
          "relative flex items-center group w-full",
          "rounded-lg overflow-hidden",
          "border-2 transition-all duration-200",
          isFocused
            ? "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20"
            : "border-border hover:border-primary/50"
        )}
      >
        {/* Category Selector - Left Side */}
        {showCategory && (
          <CategorySelector className="flex-shrink-0" />
        )}

        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search product or brand here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full h-10 sm:h-11 lg:h-12",
              "pr-12 sm:pr-14 lg:pr-16",
              showCategory ? "pl-4 sm:pl-5" : "pl-4 sm:pl-5",
              showCategory ? "rounded-none" : "rounded-l-lg",
              "border-0 border-r-0",
              "bg-background text-sm sm:text-base",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "placeholder:text-muted-foreground/70"
            )}
            aria-label="Search products"
            aria-describedby="search-description"
          />
          
          {/* Clear Button */}
          {hasQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className={cn(
                "absolute right-12 sm:right-14 lg:right-16",
                "h-8 w-8 rounded-full",
                "opacity-0 group-hover:opacity-100",
                transitions.default,
                "hover:bg-muted"
              )}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search Button - Right Side */}
        <Button
          type="submit"
          size="icon"
          className={cn(
            "h-10 sm:h-11 lg:h-12",
            "w-12 sm:w-14 lg:w-16",
            "rounded-r-lg rounded-l-none",
            "bg-primary hover:bg-primary/90 active:bg-primary/95",
            "border-0",
            transitions.colors,
            "shadow-none flex-shrink-0"
          )}
          aria-label="Search"
        >
          <Search className="h-5 w-5 text-primary-foreground" />
        </Button>
      </div>
      <span id="search-description" className="sr-only">
        Search for products by name, brand, or category
      </span>
    </form>
  );
}
