"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductById,
  updateProduct,
  clearCurrentProduct,
} from "@/store/slices/productsSlice";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Loader2,
  Package,
  DollarSign,
  Box,
  Tag,
  FileText,
  ShoppingBag,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import { fetchCategories } from "@/services/api";
import { Category } from "@/types";
import { spacing, typography } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const productId = Number(params.id);
  const { currentProduct, loading: productLoading } = useAppSelector(
    (state) => state.products
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, productId]);

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        title: currentProduct.title || "",
        description: currentProduct.description || "",
        price: currentProduct.price?.toString() || "0",
        stock: currentProduct.stock?.toString() || "0",
        brand: currentProduct.brand || "",
        category: currentProduct.category || "",
      });
    }
  }, [currentProduct]);

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  if (productLoading) {
    return (
      <MainLayout>
        <div className={spacing.section}>
          <div className={spacing.container}>
            <div className="flex items-center justify-center min-h-[60vh]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!currentProduct) {
    return (
      <MainLayout>
        <div className={spacing.section}>
          <div className={spacing.container}>
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <p className="text-destructive mb-4">Product not found</p>
              <Button onClick={() => router.push("/")}>Go Back</Button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData: any = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
      };

      if (formData.brand && formData.brand.trim() !== "") {
        productData.brand = formData.brand.trim();
      }

      await dispatch(updateProduct({ id: productId, data: productData })).unwrap();
      toast.success("Product updated successfully!");
      router.push(`/product/${productId}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MainLayout>
      <div className={spacing.section}>
        <div className={spacing.container}>
          <div className="max-w-3xl mx-auto space-y-6 lg:space-y-8">
            {/* Header Section */}
            <div className="space-y-4 pt-4">
              <Button
                variant="ghost"
                onClick={() => router.push(`/product/${productId}`)}
                className="mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Edit className="h-6 w-6 text-primary" />
                  </div>
                  <h1 className={cn(typography.heading.h2, "font-semibold")}>
                    Edit Product
                  </h1>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground pl-11">
                  Update the product details below. All fields marked with * are required.
                </p>
            </div>
          </div>

          <Card>
              <CardHeader className="pb-6">
                <CardTitle className="text-xl">Product Information</CardTitle>
              </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Title *
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter product title"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Enter a detailed product description"
                        rows={5}
                        className="resize-none"
                      />
                  </div>
                </div>

                <div className="space-y-5 border-t border-border pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-sm font-medium">
                          Price *
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                            $
                          </span>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            placeholder="0.00"
                            className="h-11 pl-8"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stock" className="text-sm font-medium">
                          Stock *
                        </Label>
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          min="0"
                          value={formData.stock}
                          onChange={handleChange}
                          required
                          placeholder="0"
                          className="h-11"
                        />
                      </div>
                  </div>
                </div>

                <div className="space-y-5 border-t border-border pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category *
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                        required
                        disabled={categoriesLoading}
                      >
                        <SelectTrigger id="category" className="h-11">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.slug} value={category.slug}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="brand" className="text-sm font-medium">
                        Brand
                      </Label>
                      <Input
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Enter product brand (optional)"
                        className="h-11"
                      />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-border">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={loading}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || categoriesLoading}
                      className="w-full sm:w-auto"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Update Product
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

