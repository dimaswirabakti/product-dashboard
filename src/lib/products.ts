import productsData from "@/data/products.json";
import type { Product } from "@/features/products/types/product";

// Async untuk simulasikan network delay & memaksa SSR
export async function getAllProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return productsData as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const product = productsData.find((p) => p.id === id);
  return (product as Product) ?? null;
}

export async function getCategories(): Promise<string[]> {
  const products = await getAllProducts();
  return Array.from(new Set(products.map((p) => p.category)));
}
