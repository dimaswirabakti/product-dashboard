"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    _hasHydrated,
  } = useCartStore();

  const totalItems = _hasHydrated ? getTotalItems() : 0;
  const totalPrice = _hasHydrated ? getTotalPrice() : 0;

  return (
    <>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        className={[
          "fixed top-0 right-0 h-full w-full max-w-md z-50",
          "bg-white shadow-2xl",
          "flex flex-col",
          "transform transition-transform duration-300 ease-in-out",
          isDrawerOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <h2 className="text-lg font-semibold text-gray-900">
            Cart{" "}
            {totalItems > 0 && (
              <span className="text-sm font-normal text-gray-500">
                ({totalItems} item{totalItems > 1 ? "s" : ""})
              </span>
            )}
          </h2>

          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6">
            <span className="text-5xl">🛒</span>
            <p className="font-medium text-gray-900">Cart masih kosong</p>
            <p className="text-sm text-gray-500">
              Tambahkan produk untuk mulai belanja
            </p>
            <Button variant="secondary" size="sm" onClick={closeDrawer}>
              Lihat Produk
            </Button>
          </div>
        ) : (
          <>
            {/* Item list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 py-4 border-b last:border-0"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 shrink-0">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="64px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">
                      {product.title}
                    </p>
                    <p className="text-blue-600 font-bold text-sm mt-0.5">
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 rounded-md border flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                        style={{ borderColor: "var(--color-border)" }}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>

                      <span className="w-8 text-center text-sm font-medium">
                        {quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 rounded-md border flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                        style={{ borderColor: "var(--color-border)" }}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal + Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-sm font-semibold text-gray-900">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                      aria-label={`Remove ${product.title}`}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 border-t space-y-3"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <Button className="w-full" size="lg">
                Checkout
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={clearCart}
              >
                Kosongkan Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
