import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { uid, email, name, photoURL } = await req.json();

    console.log("🟢 Received data:", { uid, email, name, photoURL });

    if (!uid || !email) {
      console.log("❌ Missing UID or Email");
      return NextResponse.json(
        { message: "Missing UID or Email" },
        { status: 400 }
      );
    }

    // Check if user already exists
    let existingUser = await User.findOne({ uid });
    if (existingUser) {
      console.log("⚠️ User already exists in MongoDB");
      return NextResponse.json(
        { message: "User already exists" },
        { status: 200 }
      );
    }

    // Create a new user
    const newUser = new User({ uid, email, name, photoURL });
    await newUser.save();

    console.log("✅ User saved successfully:", newUser);
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Signup API Error:", error);
    return NextResponse.json(
      { message: "Error creating user", error: error.toString() },
      { status: 500 }
    );
  }
}
