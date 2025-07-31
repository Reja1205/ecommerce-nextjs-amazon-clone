import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import Product from "@/models/Product";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const { _id, name, description, price, image } = product;

    return NextResponse.json({
      id: _id.toString(),
      name,
      description,
      price,
      image,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
