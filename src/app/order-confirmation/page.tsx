"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function getEstimatedDeliveryDate(): string {
  const now = new Date();
  now.setDate(now.getDate() + 4);
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: OrderItem[];
  total: number;
  createdAt: string;
};

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailStatus, setEmailStatus] = useState<any>(null);

  useEffect(() => {
    // Read email status from localStorage
    const status = localStorage.getItem("lastEmailStatus");
    if (status) setEmailStatus(JSON.parse(status));

    const fetchOrder = async () => {
      if (!orderId) return;

      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) throw new Error("Order not found");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("❌ Fetch order failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!order) return <p className="text-center mt-10">Order not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">✅ Order Confirmed!</h1>
      <p className="mb-2">Thank you for your purchase.</p>

      <div className="text-sm text-gray-600 mb-1">
        <strong>Order ID:</strong> {order._id}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        <strong>Date:</strong>{" "}
        {new Date(order.createdAt).toLocaleString("en-US")}
      </div>
      <div className="text-sm text-gray-600 mb-4">
        <strong>Customer:</strong> {order.customer.name}
        <br />
        <strong>Email:</strong> {order.customer.email}
        <br />
        <strong>Address:</strong> {order.customer.address}
      </div>

      <div className="text-green-700 font-medium mb-4">
        📦 Estimated delivery by: {getEstimatedDeliveryDate()}
      </div>

      {/* Show email sent / failed message */}
      {emailStatus?.error ? (
        <p className="text-red-600 mb-4">
          ❌ Confirmation email failed: {emailStatus.error}
        </p>
      ) : (
        <p className="text-green-600 mb-4">✅ Confirmation email sent!</p>
      )}

      <h2 className="font-semibold mb-2">Purchased Items:</h2>
      <ul className="text-sm mb-4 space-y-1">
        {order.items.map((item) => (
          <li key={item.id}>
            {item.name} × {item.quantity} — ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <div className="font-bold text-right text-lg">
        Total: ${order.total.toFixed(2)}
      </div>
    </div>
  );
}
