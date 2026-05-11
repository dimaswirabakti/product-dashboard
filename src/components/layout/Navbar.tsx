import Link from "next/link";

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b bg-white"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          ProductDash
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Products
          </Link>

          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">🛒</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
