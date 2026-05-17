"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCartStore } from "@/store/cartStore";

// Dynamic import — CartDrawer di-load secara lazy
// JavaScript bundle-nya tidak ikut di initial page load
// Baru di-download saat komponen ini benar-benar dirender (cart dibuka)
const CartDrawer = dynamic(
  () =>
    import("@/features/products/components/CartDrawer").then((mod) => ({
      default: mod.CartDrawer,
    })),
  {
    // ssr: false → komponen ini tidak di-render di server
    // Sah karena CartDrawer hanya muncul saat user interaksi (klik cart)
    ssr: false,
  },
);

export function Navbar() {
  const { openDrawer, getTotalItems, _hasHydrated, isDrawerOpen } =
    useCartStore();
  const totalItems = _hasHydrated ? getTotalItems() : 0;

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b bg-white"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            ProductDash
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>

            <button
              onClick={openDrawer}
              className="relative w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label={`Open cart, ${totalItems} items`}
            >
              <span className="text-lg">🛒</span>

              {_hasHydrated && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Render CartDrawer hanya saat sudah pernah dibuka */}
      {/* Trick: render placeholder kosong → CartDrawer di-import saat isDrawerOpen pertama kali true */}
      {isDrawerOpen && <CartDrawer />}
    </>
  );
}
