import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

// dynamic metadata untuk SEO per produk
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        -Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 bg-white rounded-xl p-6 border">
        {/* Container relative untuk Image fill */}
        <div className="relative w-full h-72 md:h-full min-h-64">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold mt-2 text-gray-900">
            {product.name}
          </h1>
          <p className="text-2xl text-blue-600 font-bold mt-3">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>
          <div className="mt-6 space-y-2 text-sm text-gray-600 border-t pt-4">
            <p>
              <span className="font-medium text-gray-900">Stock:</span>{" "}
              {product.stock} units
            </p>
            <p>
              <span className="font-medium text-gray-900">Rating:</span>{" "}
              {product.rating} / 5
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
