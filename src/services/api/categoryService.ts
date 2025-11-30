import axiosInstance from "@/lib/axios";
import { Category } from "@/types";

export async function fetchCategories(): Promise<Category[]> {
  const response = await axiosInstance.get<Category[]>("/products/categories");
  return response.data;
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await fetchCategories();
    return categories.find((cat) => cat.slug === slug) || null;
  } catch (error) {
    console.error("Failed to fetch category by slug:", error);
    return null;
  }
}

