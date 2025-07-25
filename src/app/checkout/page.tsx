"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cartItems, clearCart, isHydrated } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (isHydrated && cartItems.length > 0) {
      // ✅ First calculate total, then clear cart
      const calculatedTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(calculatedTotal);
      clearCart();
    }
  }, [isHydrated, cartItems, clearCart]);

  if (!isHydrated) return <p>Loading...</p>;

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">✅ Order Confirmed!</h1>
      <p className="mb-2">🎉 Thank you for your purchase.</p>
      <p className="font-semibold">Total paid: ${total.toFixed(2)}</p>
    </main>
  );
}
