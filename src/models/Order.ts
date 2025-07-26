import mongoose, { Schema, Document, models, model } from "mongoose";

// 1. Define the TypeScript interface
export interface OrderDocument extends Document {
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the schema
const OrderSchema: Schema<OrderDocument> = new mongoose.Schema(
  {
    customer: {
      name: String,
      email: String,
      address: String,
    },
    items: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    total: Number,
  },
  { timestamps: true }
);

// 3. Export the model
const OrderModel = models.Order || model<OrderDocument>("Order", OrderSchema);

export default OrderModel;
