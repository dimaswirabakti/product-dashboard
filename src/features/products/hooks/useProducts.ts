"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productApi";
import type { Product, ProductsResponse } from "../types/product";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params: { q?: string; category?: string; page?: number }) =>
    [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

interface UseProductsOptions {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
  initialData?: Product[];
}

export function useProducts({
  q = "",
  category = "",
  page = 1,
  limit = 12,
  initialData,
}: UseProductsOptions = {}) {
  const skip = (page - 1) * limit;

  const query = useQuery({
    queryKey: productKeys.list({ q, category, page }),

    queryFn: () =>
      fetchProducts({
        q: q || undefined,
        category: category || undefined,
        limit,
        skip,
      }),

    // initialData dari SSR, ditampilkan sebelum fetch selesai
    placeholderData: initialData
      ? {
          products: initialData,
          total: initialData.length,
          skip: 0,
          limit,
        }
      : undefined,

    staleTime: 60 * 1000,
  });

  return {
    // Data
    products: query.data?.products ?? [],
    total: query.data?.total ?? 0,

    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,

    query,
  };
}
