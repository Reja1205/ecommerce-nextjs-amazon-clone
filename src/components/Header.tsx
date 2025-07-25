// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [query, setQuery] = useState("");
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total: number, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          🛒 MyStore
        </Link>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Search:", query);
          }}
          className="flex-1 mx-4 max-w-md hidden sm:flex"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-r-md text-sm"
          >
            Search
          </button>
        </form>
        <nav className="flex gap-4 text-sm items-center">
          <Link href="/cart" className="hover:underline">
            🛍 Cart ({cartCount})
          </Link>
          <Link href="/orders" className="hover:underline hidden sm:inline">
            📦 Orders
          </Link>
          <Link href="/login" className="hover:underline">
            🔐 Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
