"use client";

import { CartContext } from "@/components/CartProvider/context";
import { useState, useEffect } from "react";
import { CartItem } from "@/types";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [phone, setPhone] = useState("");

  // ✅ Восстановление из localStorage при первом рендере
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      const savedPhone = localStorage.getItem("phone");

      if (savedCart) setItems(JSON.parse(savedCart));
      if (savedPhone) setPhone(savedPhone);
    } catch (err) {
      console.warn("Ошибка чтения из localStorage:", err);
    }
  }, []);

  // ✅ Сохраняем корзину при изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // ✅ Сохраняем телефон при изменении
  useEffect(() => {
    localStorage.setItem("phone", phone);
  }, [phone]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, count: newItem.count } : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, count: (item.count ?? 0) - 1 } : item
        )
        .filter((item) => (item.count ?? 0) > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, phone, setPhone }}
    >
      {children}
    </CartContext.Provider>
  );
}
