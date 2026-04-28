"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productSlug: string;
  productName: string;
  packId: string;
  packLabel: string;
  weight: string;
  price: number;
  mrp: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (packId: string) => void;
  updateQty: (packId: string, qty: number) => void;
  clear: () => void;
  totalItems: () => number;
  subtotal: () => number;
  savings: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.packId === item.packId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.packId === item.packId ? { ...i, quantity: i.quantity + qty } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        }),
      removeItem: (packId) =>
        set((state) => ({ items: state.items.filter((i) => i.packId !== packId) })),
      updateQty: (packId, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.packId === packId ? { ...i, quantity: qty } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      savings: () =>
        get().items.reduce((sum, i) => sum + (i.mrp - i.price) * i.quantity, 0),
    }),
    { name: "panchratna-cart" },
  ),
);
