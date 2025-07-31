// src/types/product.d.ts
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

// src/context/CartContext.tsx
import { Product } from "@/types/product";

export type CartItem = Product & { quantity: number };
