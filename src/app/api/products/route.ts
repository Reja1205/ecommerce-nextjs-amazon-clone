import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mock-products";

export async function GET() {
  return NextResponse.json(mockProducts);
}
