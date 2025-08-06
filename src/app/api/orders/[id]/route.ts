import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import OrderModel from "@/models/Order";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // params is a Promise now
) {
  try {
    const params = await context.params; // await the params Promise

    await connectDB();

    const order = await OrderModel.findById(params.id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching order by ID:", error);
    return NextResponse.json(
      { message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
