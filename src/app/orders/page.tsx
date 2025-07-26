"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/order";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("❌ Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </div>
          <div className="text-sm mb-2">
            <strong>Customer:</strong> {order.customer.name}
          </div>

          <ul className="text-sm mb-2">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity}
              </li>
            ))}
          </ul>

          <div className="font-semibold text-right">
            Total: ${order.total.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
