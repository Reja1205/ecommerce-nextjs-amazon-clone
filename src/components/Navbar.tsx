"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-extrabold">
          MyStore
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/cart" className="hover:underline">
            Cart
          </Link>
          <Link href="/orders" className="hover:underline">
            Orders
          </Link>

          {status === "loading" ? (
            <p>Loading...</p>
          ) : session ? (
            <>
              <span>Hi, {session.user?.name || session.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="ml-4 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="hover:underline">
                Sign In
              </Link>
              <Link href="/auth/signup" className="hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
