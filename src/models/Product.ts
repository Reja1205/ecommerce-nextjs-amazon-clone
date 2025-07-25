import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
