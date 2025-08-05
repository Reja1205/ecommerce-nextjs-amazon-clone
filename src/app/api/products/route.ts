import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();

    const products = await Product.find({});
    const productsWithId = products.map((product) => {
      const { _id, name, description, price, image } = product;
      return {
        id: _id.toString(),
        name,
        description,
        price,
        image,
      };
    });

    return NextResponse.json(productsWithId);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    if (!body.name || !body.price || !body.description || !body.image) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProduct = new Product(body);
    const savedProduct = await newProduct.save();

    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 }
    );
  }
}
