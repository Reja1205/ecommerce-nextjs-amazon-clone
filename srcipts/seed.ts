// scripts/seed.ts
import mongoose from "mongoose";
import { Product } from "@/models/Product"; // Adjust path if needed

const MONGODB_URI = process.env.MONGODB_URI as string;

const products = [
  {
    name: "Smart Watch",
    description: "Stylish smart watch with heart rate monitor and GPS.",
    image: "https://placehold.co/300x200?text=Smart+Watch",
    price: 199.99,
  },
  {
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with RGB lighting.",
    image: "https://placehold.co/300x200?text=Gaming+Mouse",
    price: 49.99,
  },
  {
    name: "Headphones",
    description:
      "Wireless noise-cancelling headphones with high-fidelity sound.",
    image: "https://placehold.co/300x200?text=Headphones",
    price: 129.99,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Dummy products added!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
}

seed();
