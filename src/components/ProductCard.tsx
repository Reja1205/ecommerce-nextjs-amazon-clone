"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

// Define the Product type
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  // Optional: Log ID to debug
  useEffect(() => {
    console.log("✅ ProductCard received product:", product);
  }, [product]);

  const handleAddToCart = () => {
    setAdding(true);
    // Add quantity: 1 when passing to addToCart
    addToCart({ ...product, quantity: 1 });
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="rounded-xl border p-4 shadow-sm hover:shadow-md transition duration-200">
      <Link href={`/product/${product.id}`}>
        <div className="cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="rounded-md mb-4"
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
          <p className="font-bold text-blue-600">${product.price}</p>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={adding}
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
