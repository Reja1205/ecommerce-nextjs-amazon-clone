"use client";

import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "...",
    price: 99.99,
    image: "https://placehold.co/300x200?text=Headphones",
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "...",
    price: 149.99,
    image: "https://placehold.co/300x200?text=Smart+Watch",
  },
  {
    id: "3",
    name: "Gaming Mouse",
    description: "...",
    price: 49.99,
    image: "https://placehold.co/300x200?text=Gaming+Mouse",
  },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
