"use client";

import { useState, useCallback, useMemo } from "react";
import { useProducts } from "../hooks";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { ProductSearchBar } from "./ProductSearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { ProductList } from "./ProductList";
import type { Product } from "../types/product";

interface ProductGridProps {
  initialProducts: Product[];
  categories: string[];
}

export function ProductGrid({ initialProducts, categories }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 500);

  const shouldUseInitialData = useMemo(
    () => debouncedQuery === "" && selectedCategory === "",
    [debouncedQuery, selectedCategory],
  );

  const { products, total, isPending, isFetching, isError, error } =
    useProducts({
      q: debouncedQuery,
      category: selectedCategory,
      initialData: shouldUseInitialData ? initialProducts : undefined,
    });

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category ?? "");
  }, []);

  // Saat mengetik, searchQuery sudah berubah, tapi debouncedQuery belum
  const isTyping = searchQuery !== debouncedQuery;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <ProductSearchBar value={searchQuery} onChange={handleSearchChange} />

        <CategoryFilter
          categories={categories}
          selected={selectedCategory || null}
          onSelect={handleCategoryChange}
        />
      </div>

      {/* Indikator mengetik vs fetching */}

      {isTyping && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
          Menunggu input selesai...
        </div>
      )}

      {!isTyping && isFetching && !isPending && (
        <div className="flex items-center gap-2 text-sm text-blue-600">
          <span className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          Memperbarui data...
        </div>
      )}

      {!isPending && !isError && !isTyping && (
        <p className="text-sm text-gray-500">
          Ditemukan <span className="font-medium text-gray-900">{total}</span>{" "}
          produk
          {debouncedQuery && ` untuk "${debouncedQuery}"`}
          {selectedCategory && ` dalam kategori "${selectedCategory}"`}
        </p>
      )}

      <ProductList
        products={products}
        isPending={isPending}
        isError={isError}
        error={error}
      />
    </div>
  );
}
