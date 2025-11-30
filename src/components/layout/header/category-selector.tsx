"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { transitions } from "@/lib/tailwind-utils";
import { formatCategoryName } from "@/lib/category-utils";
import { fetchCategories } from "@/services/api";
import { ROUTES } from "@/lib/constants";
import { Category } from "@/types";

interface CategorySelectorProps {
  className?: string;
  onCategoryChange?: (category: string | null) => void;
}

/**
 * Category Selector Component
 * Dropdown for selecting product categories
 * Integrated into search bar like BeliBeli design
 * 
 * API Endpoint: https://dummyjson.com/products/categories
 * Response Structure: Array of objects with {slug: string, name: string, url: string}
 * Example: [{slug: "smartphones", name: "Smartphones", url: "https://..."}, ...]
 */
export function CategorySelector({ className, onCategoryChange }: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // API Response Structure: [{slug: string, name: string, url: string}, ...]
        // Example: {slug: "smartphones", name: "Smartphones", url: "https://dummyjson.com/products/category/smartphones"}
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Fallback categories matching API structure
        setCategories([
          { slug: "smartphones", name: "Smartphones", url: "https://dummyjson.com/products/category/smartphones" },
          { slug: "laptops", name: "Laptops", url: "https://dummyjson.com/products/category/laptops" },
          { slug: "fragrances", name: "Fragrances", url: "https://dummyjson.com/products/category/fragrances" },
          { slug: "skin-care", name: "Skin Care", url: "https://dummyjson.com/products/category/skin-care" },
          { slug: "groceries", name: "Groceries", url: "https://dummyjson.com/products/category/groceries" },
          { slug: "home-decoration", name: "Home Decoration", url: "https://dummyjson.com/products/category/home-decoration" },
          { slug: "furniture", name: "Furniture", url: "https://dummyjson.com/products/category/furniture" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryChange = (value: string) => {
    const category = value === "all" ? null : value;
    
    if (onCategoryChange) {
      onCategoryChange(category);
    } else {
      // Update URL with category
      const params = new URLSearchParams(searchParams.toString());
      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }
      router.push(`${ROUTES.HOME}?${params.toString()}`);
    }
  };

  // Find the selected category object to display its name
  const selectedCategoryObj = categories.find(
    (cat) => cat.slug === selectedCategory
  );
  const displayName = selectedCategoryObj
    ? selectedCategoryObj.name
    : selectedCategory
    ? formatCategoryName(selectedCategory)
    : "All Category";

  return (
    <Select
      value={selectedCategory || "all"}
      onValueChange={handleCategoryChange}
      disabled={loading}
    >
      <SelectTrigger
        className={cn(
          "h-10 sm:h-11 lg:h-12",
          "w-[140px] sm:w-[160px] lg:w-[180px]",
          "rounded-l-lg rounded-r-none border-r-0",
          "bg-muted/50 hover:bg-muted",
          "text-sm font-medium",
          transitions.colors,
          "focus:ring-0 focus:ring-offset-0",
          className
        )}
      >
        <SelectValue placeholder="All Category">
          {displayName}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <SelectItem value="all" className="font-semibold">
          All Category
        </SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.slug} value={category.slug}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

