"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = () => {
    setAdding(true);
    addToCart({ ...product, quantity: 1 });
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="rounded-xl border p-4 shadow-sm hover:shadow-md transition duration-200 flex flex-col">
      <Link href={`/product/${product.id}`} className="cursor-pointer">
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 300px"
            priority={false}
          />
        </div>
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="font-bold text-blue-600">${product.price}</p>
      </Link>

      <button
        onClick={handleAddToCart}
        className="mt-auto w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={adding}
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
