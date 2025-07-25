"use client";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import ShippingForm, { ShippingInfo } from "@/components/ShippingForm";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [total, setTotal] = useState(0);
  const [paidTotal, setPaidTotal] = useState(0); // 💰 Save this after placing the order

  useEffect(() => {
    setIsHydrated(true);
    const t = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(t);
  }, [cartItems]);

  const handleShippingSubmit = (info: ShippingInfo) => {
    const orderTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setPaidTotal(orderTotal); // ✅ Save total before clearing cart

    const order = {
      items: cartItems,
      total: orderTotal,
      shippingInfo: info,
      timestamp: new Date().toISOString(),
    };

    // Optional: save to localStorage
    localStorage.setItem("lastOrder", JSON.stringify(order));

    clearCart();
    setOrderPlaced(true);
  };

  if (!isHydrated) return null;

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-green-600 mb-2">
          ✅ Order Confirmed!
        </h1>
        <p className="mb-4">🎉 Thank you for your purchase.</p>
        <p className="text-lg font-medium">
          Total paid: ${paidTotal.toFixed(2)}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <ShippingForm onSubmit={handleShippingSubmit} />

      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-2">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="font-bold mt-2 text-right">
          Total: ${total.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
