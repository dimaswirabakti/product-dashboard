import { apiClient } from "@/lib/apiClient";
import type {
  Product,
  ProductsResponse,
  ProductsParams,
  Category,
} from "../types/product";

// PRODUCT API FUNCTIONS

/**
 * Ambil daftar produk dengan pagination dan filter opsional
 * GET /products?limit=12&skip=0
 * GET /products/search?q=keyword&limit=12
 * GET /products/category/:category?limit=12
 */
export async function fetchProducts(
  params: ProductsParams = {},
): Promise<ProductsResponse> {
  const { limit = 12, skip = 0, q, category } = params;

  // Pilih endpoint berdasarkan parameter
  if (q && q.trim().length > 0) {
    // Search endpoint
    const response = await apiClient.get<ProductsResponse>("/products/search", {
      params: { q, limit, skip },
    });
    return response.data;
  }

  if (category) {
    // Filter per kategori
    const response = await apiClient.get<ProductsResponse>(
      `/products/category/${encodeURIComponent(category)}`,
      { params: { limit, skip } },
    );
    return response.data;
  }

  // Default, semua produk
  const response = await apiClient.get<ProductsResponse>("/products", {
    params: { limit, skip },
  });
  return response.data;
}

/**
 * Ambil satu produk berdasarkan ID
 * GET /products/:id
 */
export async function fetchProductById(id: number): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
}

/**
 * Ambil semua kategori
 * GET /products/categories
 */
export async function fetchCategories(): Promise<Category[]> {
  const response = await apiClient.get<Category[]>("/products/categories");
  return response.data;
}
