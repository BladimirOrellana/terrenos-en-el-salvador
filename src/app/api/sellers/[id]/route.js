import { NextResponse } from "next/server";
import Seller from "@/models/seller"; // ✅ Import the correct seller model
import { Property } from "@/models/Property";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req, context) {
  try {
    await connectToDatabase();

    // ✅ Ensure `params` is properly resolved
    const params = await context.params;
    console.log("Resolved params:", params); // Debugging log

    if (!params || !params.id) {
      return NextResponse.json(
        { message: "Missing or invalid seller ID" },
        { status: 400 }
      );
    }

    const sellerId = params.id;

    // ✅ Fetch seller info from the correct Seller model
    const seller = await Seller.findOne({ uid: sellerId }).lean();
    console.log("Seller info:", seller);

    if (!seller) {
      return NextResponse.json(
        { message: "Seller not found" },
        { status: 404 }
      );
    }

    // ✅ Fetch seller's property listings
    const listings = await Property.find({ ownerId: sellerId }).lean();

    return NextResponse.json({ seller, listings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching seller data:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
