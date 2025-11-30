export function formatCategoryName(category: string | null | undefined): string {
  if (!category || typeof category !== "string" || category.trim().length === 0) {
    return "All Category";
  }
  
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatCategoryForTitle(category: string | null | undefined): string {
  if (!category || typeof category !== "string" || category.trim().length === 0) {
    return "";
  }
  
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function isValidCategory(category: string | null | undefined): category is string {
  return typeof category === "string" && category.trim().length > 0;
}

