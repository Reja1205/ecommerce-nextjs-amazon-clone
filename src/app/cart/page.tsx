"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty.{" "}
          <Link href="/" className="text-blue-600 underline">
            Go back to shop
          </Link>
        </p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border p-4 rounded-lg shadow-sm"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-lg mr-4"
              />
              <div className="flex-1">
                <h2 className="font-medium text-lg">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  className="mt-2 border rounded px-2 py-1 w-20 text-center"
                />
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6">
            <p className="text-xl font-semibold mb-2">
              Total: ${total.toFixed(2)}
            </p>
            <Link
              href="/checkout"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
