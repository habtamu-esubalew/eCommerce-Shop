import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductDetail, ProductsResponse, CreateProductPayload, UpdateProductPayload } from "@/types";
import {
  fetchProducts as fetchProductsService,
  fetchProductById as fetchProductByIdService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
  FetchProductsParams,
} from "@/services/api";

interface ProductsState {
  items: Product[];
  currentProduct: ProductDetail | null;
  loading: boolean;
  error: string | null;
  total: number;
  skip: number;
  limit: number;
  searchQuery: string;
}

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 10,
  searchQuery: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: FetchProductsParams) => {
    return await fetchProductsService(params);
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number) => {
    return await fetchProductByIdService(id);
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData: CreateProductPayload) => {
    return await createProductService(productData);
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }: { id: number; data: Partial<UpdateProductPayload> }) => {
    return await updateProductService(id, data);
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    await deleteProductService(id);
    return id;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const products = action.payload.products.map(p => ({ ...p, images: [...p.images] }));
        if (action.meta.arg.skip === 0) {
          state.items = products;
        } else {
          state.items = [...state.items, ...products];
        }
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        const product = action.payload;
        state.currentProduct = {
          ...product,
          images: [...product.images],
          tags: product.tags ? [...product.tags] : undefined,
          reviews: product.reviews ? [...product.reviews] : undefined,
        };
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift({ ...action.payload, images: [...action.payload.images] });
        state.total += 1;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const product = action.payload;
        const mutableProduct = { ...product, images: [...product.images] };
        const index = state.items.findIndex((p) => p.id === product.id);
        if (index !== -1) {
          state.items[index] = mutableProduct;
        }
        if (state.currentProduct?.id === product.id) {
          const detail = product as ProductDetail;
          state.currentProduct = {
            ...detail,
            images: [...detail.images],
            tags: detail.tags ? [...detail.tags] : undefined,
            reviews: detail.reviews ? [...detail.reviews] : undefined,
          };
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        state.total -= 1;
        if (state.currentProduct?.id === action.payload) {
          state.currentProduct = null;
        }
      });
  },
});

export const { setSearchQuery, clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;

