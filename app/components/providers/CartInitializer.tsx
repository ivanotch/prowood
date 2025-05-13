'use client'
import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStores";

export default function CartInitializer() {
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        setCart(data.cartItem);  // this populates Zustand cartItems
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [setCart]);

  return null;
}
