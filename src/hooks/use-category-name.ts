import { useState, useEffect, useMemo } from "react";
import { fetchCategories } from "@/services/api";
import { Category } from "@/types";
import { formatCategoryName } from "@/lib/category-utils";

export function useCategoryName(slug: string | null | undefined): string {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const categoryName = useMemo(() => {
    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      return "";
    }

    const category = categories.find((cat) => cat.slug === slug);
    return category ? category.name : formatCategoryName(slug);
  }, [slug, categories]);

  return categoryName;
}

