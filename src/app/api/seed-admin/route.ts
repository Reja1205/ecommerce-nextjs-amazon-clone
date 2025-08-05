import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongo";

async function seedAdmin() {
  await connectToDatabase();

  const adminEmail = "admin@example.com";
  const plainPassword = "admin123"; // Change this password if you want

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    existingAdmin.password = hashedPassword;
    await existingAdmin.save();
    console.log("✅ Admin password updated.");
  } else {
    await User.create({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Admin created successfully.");
  }

  mongoose.disconnect();
}

seedAdmin().catch((error) => {
  console.error("❌ Failed to seed admin:", error);
  mongoose.disconnect();
});
