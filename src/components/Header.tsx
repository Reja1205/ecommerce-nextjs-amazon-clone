"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function Header() {
  const cart = useContext(CartContext);

  const totalItems =
    cart?.cartItems.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          🛒 MyStore
        </Link>
        <nav className="flex gap-4 text-sm items-center">
          <Link href="/cart" className="hover:underline">
            🛍 Cart ({totalItems})
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
