import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/features/products/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  // Hydration tracking: false di server, true setelah client mount
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;

  items: CartItem[];
  isDrawerOpen: boolean;

  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: number) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      setHasHydrated: (value: boolean) => set({ _hasHydrated: value }),

      items: [],
      isDrawerOpen: false,

      addItem: (product: Product) => {
        const existing = get().items.find(
          (item) => item.product.id === product.id,
        );

        if (existing) {
          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { product, quantity: 1 }],
          }));
        }

        set({ isDrawerOpen: true });
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        ),

      isInCart: (productId: number) =>
        get().items.some((item) => item.product.id === productId),
    }),

    {
      name: "product-dashboard-cart",
      partialize: (state) => ({ items: state.items }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
