export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  availabilityStatus: string;
}

// Response shape dari GET /products dan GET /products/search
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Shape dari GET /products/categories
export interface Category {
  slug: string;
  name: string;
  url: string;
}

// Parameter untuk query products
export interface ProductsParams {
  limit?: number;
  skip?: number;
  q?: string; // untuk search
  category?: string; // untuk filter per kategori
}
