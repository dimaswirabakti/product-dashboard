import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="border rounded-lg p-4 hover:shadow-lg transition-shadow block bg-white group"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="relative w-full h-44 mb-3 overflow-hidden rounded-md">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <Badge variant="default" className="mb-2">
        {product.category}
      </Badge>

      <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug">
        {product.title}
      </h3>

      <div className="flex items-center justify-between mt-3">
        <p className="text-blue-600 font-bold text-lg">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>⭐</span>
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
