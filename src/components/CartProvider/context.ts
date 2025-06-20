"use client"

import {createContext, useContext} from "react";
import {CartContextType} from "@/types";

export const CartContext = createContext<CartContextType | undefined>(undefined);

// Хук удобного доступа
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart должен использоваться внутри <CartProvider>");
  }
  return context;
}