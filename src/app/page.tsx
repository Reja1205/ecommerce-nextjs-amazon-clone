import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <ProductGrid />
    </main>
  );
}
