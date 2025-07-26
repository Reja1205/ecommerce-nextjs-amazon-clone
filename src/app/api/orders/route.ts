import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import OrderModel from "@/models/Order";

// POST: Save a new order
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const newOrder = new OrderModel(body);
    const savedOrder = await newOrder.save();

    return NextResponse.json(savedOrder, { status: 201 });
  } catch (error) {
    console.error("❌ Error saving order:", error);
    return NextResponse.json(
      { message: "Failed to save order" },
      { status: 500 }
    );
  }
}

// GET: Return list of orders, sorted by most recent
export async function GET() {
  try {
    await connectDB();

    const orders = await OrderModel.find().sort({ createdAt: -1 });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
