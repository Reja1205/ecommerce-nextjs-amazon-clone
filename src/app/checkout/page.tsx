"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const { data: session, status } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    setIsHydrated(true);

    if (session?.user?.email) {
      setEmail(session.user.email);
    }

    const t = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(t);
  }, [cartItems, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      alert("You must be logged in to place an order.");
      router.push("/login");
      return;
    }

    if (!name || !address || !cardNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    const order = {
      customer: { name, email, address },
      items: cartItems,
      total,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Failed to save order");

      const data = await res.json();
      console.log("✅ Order saved:", data.savedOrder);
      console.log("📧 Email result:", data.emailResult);

      localStorage.setItem("lastOrder", JSON.stringify(data.savedOrder));
      localStorage.setItem("lastEmailStatus", JSON.stringify(data.emailResult));

      clearCart();
      router.push(`/order-confirmation?orderId=${data.savedOrder._id}`);
    } catch (err) {
      console.error("❌ Order submit failed:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!isHydrated) return null;

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
            className="w-full border px-3 py-2 rounded bg-gray-100"
            value={email}
            readOnly
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

        <div>
          <label className="block font-medium">Card Number (Fake)</label>
          <input
            type="text"
            required
            placeholder="1234 5678 9012 3456"
            className="w-full border px-3 py-2 rounded"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            💳 Use any 16-digit fake card number (not real payment).
          </p>
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
