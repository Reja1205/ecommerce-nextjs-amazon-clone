"use client";

import { Product } from "@/types/product";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-xl border p-4 shadow-sm hover:shadow-md transition duration-200">
      <div className="relative h-48 w-full mb-4">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          className="object-cover rounded-md"
        />
      </div>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
        {product.description}
      </p>
      <p className="font-bold text-blue-600">${product.price}</p>
    </div>
  );
}
