import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui";
import type { Metadata } from "next";
import { AddToCartButton } from "@/features/products/components/AddToCartButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  console.log(
    `[SERVER] Rendering /products/${id} at ${new Date().toISOString()}`,
  );

  const product = await getProductById(Number(id));

  if (!product) notFound();

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="text-blue-600 hover:underline mb-6 inline-block text-sm"
      >
        Kembali ke Products
      </Link>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 bg-white rounded-xl p-6 border"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="relative w-full h-80 md:h-full min-h-72">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <Badge variant="default">{product.category}</Badge>

          <h1 className="text-3xl font-bold mt-3 text-gray-900">
            {product.title}
          </h1>

          {product.brand && (
            <p className="text-gray-500 text-sm mt-1">by {product.brand}</p>
          )}

          <p className="text-3xl text-blue-600 font-bold mt-4">
            ${product.price.toFixed(2)}
          </p>

          {product.discountPercentage > 0 && (
            <p className="text-green-600 text-sm mt-1">
              {product.discountPercentage.toFixed(0)}% off
            </p>
          )}

          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <div
            className="mt-6 space-y-2 text-sm border-t pt-4"
            style={{ borderColor: "var(--color-border)" }}
          >
            <p>
              <span className="font-medium text-gray-900">Stock:</span>{" "}
              <span className="text-gray-600">{product.stock} units</span>
            </p>
            <p>
              <span className="font-medium text-gray-900">Rating: </span>{" "}
              <span className="text-gray-600">
                 {product.rating.toFixed(1)} / 5
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-900">Status:</span>{" "}
              <Badge
                variant={
                  product.stock > 10
                    ? "green"
                    : product.stock > 0
                      ? "yellow"
                      : "red"
                }
              >
                {product.availabilityStatus}
              </Badge>
            </p>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
