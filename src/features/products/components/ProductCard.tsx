"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge, Button } from "@/components/ui";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

function ProductCardComponent({ product, priority = false }: ProductCardProps) {
  const { addItem, isInCart, _hasHydrated } = useCartStore();
  const inCart = _hasHydrated ? isInCart(product.id) : false;

  return (
    <div
      className="border rounded-lg bg-white overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
      style={{ borderColor: "var(--color-border)" }}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            priority={priority}
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Badge variant="default" className="mb-2 self-start">
          {product.category}
        </Badge>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-2">
          <p className="text-blue-600 font-bold text-lg">
            ${product.price.toFixed(2)}
          </p>
          <span className="text-sm text-gray-500">
            ⭐ {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-auto pt-3">
          <Button
            variant={inCart ? "secondary" : "primary"}
            size="sm"
            className="w-full"
            onClick={() => addItem(product)}
          >
            {inCart ? "✓ Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export const ProductCard = memo(ProductCardComponent);
