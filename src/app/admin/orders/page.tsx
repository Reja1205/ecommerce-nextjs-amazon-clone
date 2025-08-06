"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Order {
  _id: string;
  customer: {
    name: string;
    email: string;
  };
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterEmail, setFilterEmail] = useState<string>("");

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (!session || session.user.role !== "admin") return;

    async function fetchOrders() {
      let url = "/api/admin/orders";
      const query = [];
      if (filterStatus !== "all") query.push(`status=${filterStatus}`);
      if (filterEmail.trim() !== "")
        query.push(`email=${encodeURIComponent(filterEmail.trim())}`);
      if (query.length > 0) url += `?${query.join("&")}`;

      const res = await fetch(url);
      const data = await res.json();
      setOrders(data);
    }

    fetchOrders();
  }, [filterStatus, filterEmail, session]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      alert("Failed to update order status");
      return;
    }

    const updated = await res.json();
    setOrders((prev) =>
      prev.map((order) => (order._id === id ? updated : order))
    );
  };

  if (status === "loading") {
    return <div className="p-6 text-gray-600">Loading admin orders...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Admin - Manage Orders</h1>

      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Filter by customer email"
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-2 border">{order.customer.name}</td>
                  <td className="p-2 border">{order.customer.email}</td>
                  <td className="p-2 border">${order.total.toFixed(2)}</td>
                  <td className="p-2 border">{order.status || "pending"}</td>
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    <select
                      value={order.status || "pending"}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
