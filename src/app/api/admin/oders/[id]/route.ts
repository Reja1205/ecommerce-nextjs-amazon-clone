// app/api/admin/orders/[id]/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import OrderModel from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Explicitly type the expected body shape:
  const { status }: { status: string } = await req.json();

  const updatedOrder = await OrderModel.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );

  if (!updatedOrder) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(updatedOrder);
}
