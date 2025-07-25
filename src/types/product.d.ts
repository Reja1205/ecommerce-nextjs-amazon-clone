// ✅ src/types/product.d.ts
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
};
