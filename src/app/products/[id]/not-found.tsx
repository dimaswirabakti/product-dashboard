import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-6xl font-bold text-gray-200 mb-4">404</h2>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Product Not Found
        </h3>
        <p className="text-gray-500 mb-8">
          Produk yang kamu cari tidak ada atau sudah dihapus.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block font-medium"
        >
          ← Kembali ke Products
        </Link>
      </div>
    </main>
  );
}
