import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
} from "@/features/products/api/productApi";
import type {
  Product,
  ProductsResponse,
  Category,
} from "@/features/products/types/product";

export type { Product, ProductsResponse, Category };

export async function getAllProducts(limit = 12): Promise<Product[]> {
  const response = await fetchProducts({ limit });
  return response.products;
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    return await fetchProductById(id);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const categories = await fetchCategories();
    return categories.map((c) => c.name);
  } catch {
    return [];
  }
}
