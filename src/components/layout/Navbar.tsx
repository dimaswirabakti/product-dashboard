import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          ProductDash
        </Link>

        <div className="flex gap-6">
          <Link
            href="/products"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}
