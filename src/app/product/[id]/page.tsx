"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart, CartItem } from "@/context/CartContext";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-10">No product found.</p>;

  const handleAddToCart = () => {
    const cartItem: CartItem = { ...product, quantity: 1 };
    addToCart(cartItem);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={400}
        className="w-full object-cover rounded"
      />
      <h1 className="text-3xl font-bold my-4">{product.name}</h1>
      <p className="mb-4">{product.description}</p>
      <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
