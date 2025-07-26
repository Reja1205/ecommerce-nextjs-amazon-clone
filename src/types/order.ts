import { CartItem } from "@/context/CartContext";

export type Order = {
  _id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  createdAt: string; // ✅ Match Mongoose's auto timestamp field
};
