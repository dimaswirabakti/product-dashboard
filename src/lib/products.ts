// File ini hanya ada di Server Components

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

// Untuk SSR di app/products/page.tsx
export async function getAllProducts(limit = 12): Promise<Product[]> {
  const response = await fetchProducts({ limit });
  return response.products;
}

// Untuk SSR di app/products/[id]/page.tsx
export async function getProductById(id: number): Promise<Product | null> {
  try {
    return await fetchProductById(id);
  } catch {
    return null;
  }
}

// Ambil daftar kategori
export async function getCategories(): Promise<string[]> {
  try {
    const categories = await fetchCategories();
    return categories.map((c) => c.name);
  } catch {
    return [];
  }
}
