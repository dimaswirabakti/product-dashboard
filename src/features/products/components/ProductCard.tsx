import Link from "next/link";
import Image from "next/image";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="border rounded-lg p-4 hover:shadow-lg transition block bg-white"
    >
      <div className="relative w-full h-40 mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          className="object-cover rounded"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <span className="text-xs text-gray-500 uppercase tracking-wide">
        {product.category}
      </span>
      <h3 className="font-semibold mt-1 text-gray-900">{product.name}</h3>
      <p className="text-blue-600 font-bold mt-2">
        ${product.price.toFixed(2)}
      </p>
    </Link>
  );
}
