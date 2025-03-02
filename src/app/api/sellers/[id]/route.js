import { NextResponse } from "next/server";
import User from "@/models/User";
import Property from "@/models/Property";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    // ✅ Fix: Extract seller ID properly
    const sellerId = params?.id;

    if (!sellerId) {
      return NextResponse.json(
        { message: "Missing seller ID" },
        { status: 400 }
      );
    }

    // Fetch seller information
    const seller = await User.findOne({ uid: sellerId });

    if (!seller) {
      return NextResponse.json(
        { message: "Seller not found" },
        { status: 404 }
      );
    }

    // Fetch seller's listings
    const listings = await Property.find({ ownerId: sellerId });

    return NextResponse.json({ seller, listings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching seller data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
