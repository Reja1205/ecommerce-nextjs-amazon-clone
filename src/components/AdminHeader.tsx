// components/AdminHeader.tsx
"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminHeader() {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-semibold">🛠 Admin Dashboard</div>
      <nav className="space-x-4">
        <Link href="/admin/products" className="hover:underline">
          📦 All Products
        </Link>
        <Link href="/admin/products/new" className="hover:underline">
          ➕ Add Product
        </Link>
        <Link href="/admin/orders" className="hover:underline">
          📋 All Orders
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="hover:underline"
        >
          🔓 Logout
        </button>
      </nav>
    </header>
  );
}
