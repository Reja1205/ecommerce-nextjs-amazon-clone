// app/api/orders/route.ts

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import OrderModel from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { sendOrderEmail, SendEmailResult } from "@/lib/email";

type OrderRequestBody = {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  customer: {
    name: string;
    address: string;
  };
};

const getEstimatedDeliveryDate = () => {
  const now = new Date();
  now.setDate(now.getDate() + 4);
  return now.toISOString();
};

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as OrderRequestBody;

    const orderData = {
      ...body,
      customer: {
        ...body.customer,
        email: session.user.email,
      },
      estimatedDelivery: getEstimatedDeliveryDate(),
    };

    const newOrder = new OrderModel(orderData);
    const savedOrder = await newOrder.save();

    let emailResult: SendEmailResult | null = null;

    try {
      emailResult = await sendOrderEmail({
        to: savedOrder.customer.email,
        name: savedOrder.customer.name,
        orderId: savedOrder._id.toString(),
        total: savedOrder.total,
      });
    } catch (error: unknown) {
      console.error("❌ Email send failed:", error);
      if (error instanceof Error) {
        emailResult = { error: error.message };
      } else {
        emailResult = { error: "Unknown error" };
      }
    }

    return NextResponse.json({ savedOrder, emailResult }, { status: 201 });
  } catch (error) {
    console.error("❌ Error saving order:", error);
    return NextResponse.json(
      { message: "Failed to save order", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    const userOrders = await OrderModel.find({
      "customer.email": userEmail,
    }).sort({ createdAt: -1 });

    return NextResponse.json(userOrders, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders", error },
      { status: 500 }
    );
  }
}
