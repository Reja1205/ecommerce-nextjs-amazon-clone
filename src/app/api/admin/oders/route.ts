// app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import OrderModel from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const orders = await OrderModel.find().sort({ createdAt: -1 });
  return NextResponse.json(orders);
}
