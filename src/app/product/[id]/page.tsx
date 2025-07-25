// app/product/[id]/page.tsx
import { getProductById } from "@/lib/products";
import Image from "next/image";

type Props = {
  params: { id: string };
};

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id);

  if (!product) {
    return <div className="p-4 text-red-500">Product not found</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="rounded-md"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-blue-600 mb-4">
            ${product.price}
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
