"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/productApi";
import { productKeys } from "./useProducts";
import type { Product } from "../types/product";

interface UseProductOptions {
  id: number;
  initialData?: Product;
}

export function useProduct({ id, initialData }: UseProductOptions) {
  const query = useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),

    initialData,

    staleTime: 5 * 60 * 1000,
  });

  return {
    product: query.data,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    query,
  };
}
