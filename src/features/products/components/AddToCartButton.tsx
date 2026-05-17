"use client";

import { Button } from "@/components/ui";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "../types/product";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem, isInCart, _hasHydrated } = useCartStore();
  const inCart = _hasHydrated ? isInCart(product.id) : false;

  return (
    <div className="flex gap-3 mt-6">
      <Button
        size="lg"
        variant={inCart ? "secondary" : "primary"}
        className="flex-1"
        onClick={() => addItem(product)}
      >
        {inCart ? "✓ Added to Cart" : "Add to Cart"}
      </Button>
    </div>
  );
}
