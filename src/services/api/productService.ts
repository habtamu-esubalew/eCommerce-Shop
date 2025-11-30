import axiosInstance from "@/lib/axios";
import { Product, ProductDetail, ProductsResponse, CreateProductPayload, UpdateProductPayload } from "@/types";

export interface FetchProductsParams {
  skip?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export async function fetchProducts(params: FetchProductsParams = {}): Promise<ProductsResponse> {
  const { skip = 0, limit = 10, search = "", category = "" } = params;
  
  let url = "";
  
  if (category) {
    url = `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  } else if (search) {
    url = `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else {
    url = `/products?limit=${limit}&skip=${skip}`;
  }
  
  const response = await axiosInstance.get<ProductsResponse>(url);
  return response.data;
}

export async function fetchProductById(id: number): Promise<ProductDetail> {
  const response = await axiosInstance.get<ProductDetail>(`/products/${id}`);
  return response.data;
}

export async function createProduct(productData: CreateProductPayload): Promise<Product> {
  const response = await axiosInstance.post<Product>("/products/add", productData);
  return response.data;
}

export async function updateProduct(id: number, data: Partial<UpdateProductPayload>): Promise<Product> {
  const response = await axiosInstance.patch<Product>(`/products/${id}`, data);
  return response.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await axiosInstance.delete(`/products/${id}`);
}

