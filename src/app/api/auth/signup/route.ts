import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import User from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await hash(password, 12);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  await user.save();

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
