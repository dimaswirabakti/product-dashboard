import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "@/components/ui";
import type { Product } from "../types/product";

interface ProductListProps {
  products: Product[];
  isPending?: boolean;
  isError?: boolean;
  error?: Error | null;
}

export function ProductList({
  products,
  isPending = false,
  isError = false,
  error = null,
}: ProductListProps) {
  // Loading state
  if (isPending) {
    return <ProductGridSkeleton />;
  }

  // Error state
  if (isError) {
    return (
      <div
        className="text-center py-16 border rounded-lg bg-red-50"
        style={{ borderColor: "#fecaca" }}
      >
        <p className="text-red-600 font-medium">Gagal memuat produk</p>
        <p className="text-red-400 text-sm mt-1">
          {error?.message ?? "Terjadi kesalahan. Silakan coba lagi."}
        </p>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">Produk tidak ditemukan</p>
        <p className="text-gray-300 text-sm mt-1">
          Coba kata kunci atau kategori lain
        </p>
      </div>
    );
  }

  // Success state
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
