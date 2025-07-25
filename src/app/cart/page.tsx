// ✅ src/app/cart/page.tsx
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border p-2 rounded shadow"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded mr-4"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p>${item.price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  className="border p-1 w-16 mt-1"
                />
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline ml-4"
              >
                Remove
              </button>
            </div>
          ))}

          <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          <Link
            href="/checkout"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
