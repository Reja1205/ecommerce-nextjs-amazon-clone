// src/models/Product.ts
import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

// ✅ Export Mongoose model (default export only)
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
