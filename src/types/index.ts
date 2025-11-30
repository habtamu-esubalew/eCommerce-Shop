export interface Product {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly discountPercentage: number;
  readonly rating: number;
  readonly stock: number;
  readonly brand: string;
  readonly category: string;
  readonly thumbnail: string;
  readonly images: readonly string[];
}

export interface ProductReview {
  readonly rating: number;
  readonly comment: string;
  readonly date: string;
  readonly reviewerName: string;
  readonly reviewerEmail: string;
}

export interface ProductDimensions {
  readonly width: number;
  readonly height: number;
  readonly depth: number;
}

export interface ProductMeta {
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly barcode: string;
  readonly qrCode: string;
}

export interface ProductDetail extends Product {
  readonly tags?: readonly string[];
  readonly sku?: string;
  readonly weight?: number;
  readonly dimensions?: ProductDimensions;
  readonly warrantyInformation?: string;
  readonly shippingInformation?: string;
  readonly availabilityStatus?: string;
  readonly reviews?: readonly ProductReview[];
  readonly returnPolicy?: string;
  readonly minimumOrderQuantity?: number;
  readonly meta?: ProductMeta;
}

export interface ProductsResponse {
  readonly products: readonly Product[];
  readonly total: number;
  readonly skip: number;
  readonly limit: number;
}

export interface CreateProductPayload {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly brand: string;
  readonly category: string;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  readonly id: number;
}

export interface User {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly gender?: string;
  readonly image?: string;
}

export interface Category {
  readonly slug: string;
  readonly name: string;
  readonly url: string;
}

export type ThemeMode = "light" | "dark";

export interface ApiError {
  readonly message: string;
  readonly status?: number;
  readonly code?: string;
}

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export interface CartItem {
  readonly product: Product;
  readonly quantity: number;
}
