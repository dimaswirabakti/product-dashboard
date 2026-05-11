import { getAllProducts, getCategories } from "@/lib/products";
import { ProductGrid } from "@/features/products/components/ProductGrid";

export default async function ProductsPage() {
  console.log(`[SERVER] Rendering /products at ${new Date().toISOString()}`);

  const [products, categories] = await Promise.all([
    getAllProducts(12),
    getCategories(),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Menampilkan {products.length} produk
        </p>
      </header>

      <ProductGrid initialProducts={products} categories={categories} />
    </main>
  );
}
