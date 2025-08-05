"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data: Product[] = await res.json();

        setProducts(data); // ✅ No need to remap if backend sends correct shape
      } catch (error) {
        console.error("❌ Failed to load products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}
