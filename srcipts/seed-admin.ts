import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";

async function seedAdmin() {
  await connectToDatabase();

  const adminEmail = "admin@example.com";
  const plainPassword = "admin123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    existing.password = hashedPassword;
    await existing.save();
    console.log("✅ Admin password updated.");
  } else {
    await User.create({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Admin created.");
  }

  mongoose.disconnect();
}

seedAdmin().catch((err) => {
  console.error("❌ Failed to seed admin:", err);
  mongoose.disconnect();
});
