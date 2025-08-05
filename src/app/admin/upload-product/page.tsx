"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UploadProductPage() {
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>Please log in to access this page.</p>;

  if (session.user.role !== "admin") {
    return (
      <p className="text-red-600 font-bold">Access denied. Admins only.</p>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.price || !form.image) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          image: form.image,
        }),
      });

      if (!res.ok) throw new Error("Failed to add product");

      const data = await res.json();
      setMessage(`Product "${data.name}" added successfully!`);
      setForm({ name: "", description: "", price: "", image: "" });
    } catch (error) {
      setMessage("Error adding product.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Admin dashboard banner */}
      <div className="mb-6 p-4 rounded bg-yellow-100 text-yellow-800 font-semibold text-center border border-yellow-300">
        You are in the <span className="font-bold">Admin Dashboard</span> — only
        admins can add products here.
      </div>

      <h1 className="text-2xl font-bold mb-4">Add New Product (Admin)</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
