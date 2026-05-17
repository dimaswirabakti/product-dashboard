import { apiClient } from "@/lib/apiClient";
import type {
  Product,
  ProductsResponse,
  ProductsParams,
  Category,
} from "../types/product";

// PRODUCT API FUNCTIONS

export async function fetchProducts(
  params: ProductsParams = {},
): Promise<ProductsResponse> {
  const { limit = 12, skip = 0, q, category } = params;

  if (q && q.trim().length > 0) {
    const response = await apiClient.get<ProductsResponse>("/products/search", {
      params: { q, limit, skip },
    });
    return response.data;
  }

  if (category) {
    const response = await apiClient.get<ProductsResponse>(
      `/products/category/${encodeURIComponent(category)}`,
      { params: { limit, skip } },
    );
    return response.data;
  }

  const response = await apiClient.get<ProductsResponse>("/products", {
    params: { limit, skip },
  });
  return response.data;
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await apiClient.get<Category[]>("/products/categories");
  return response.data;
}
