"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Order {
  _id: string;
  customer: {
    name: string;
    email: string;
    address?: string;
  };
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error("Error loading order:", error);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (!order) return <div>Loading order confirmation...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>Name:</strong> {order.customer?.name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {order.customer?.email || "N/A"}
      </p>
      <p>
        <strong>Total:</strong> ${order.total.toFixed(2)}
      </p>

      <h2 className="mt-6 font-semibold">Items:</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item.id} className="mb-2">
            {item.name} x {item.quantity} — ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-green-600 font-semibold">
        Thank you for your purchase! You’ll receive a shipping email soon.
      </p>
    </div>
  );
}
