"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [total, setTotal] = useState(0);
  const [paidTotal, setPaidTotal] = useState(0);

  // Shipping form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setIsHydrated(true);
    const t = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(t);
  }, [cartItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setPaidTotal(orderTotal);

    const order = {
      customer: {
        name,
        email,
        address,
      },
      items: cartItems,
      total: orderTotal,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Failed to save order");

      const savedOrder = await res.json();
      console.log("✅ Order saved:", savedOrder);
    } catch (error) {
      console.error("❌ Failed to submit order:", error);
    }

    // Backup to localStorage
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

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium">Name</label>
          <input
            required
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            required
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <textarea
            required
            className="w-full border px-3 py-2 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>

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
