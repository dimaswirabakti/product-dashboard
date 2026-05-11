"use client";

import { useState } from "react";
import type { Product } from "@/features/products/types/product";
import { ProductSearchBar } from "./ProductSearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { ProductList } from "./ProductList";

interface ProductGridProps {
  initialProducts: Product[];
  categories: string[];
}

export function ProductGrid({ initialProducts, categories }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtering di client — Demonstrasi CSR
  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <ProductSearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <ProductList products={filteredProducts} />
    </div>
  );
}
