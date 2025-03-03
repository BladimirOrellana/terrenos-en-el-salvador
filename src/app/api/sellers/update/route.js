import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Seller from "@/models/seller";

export async function POST(req) {
  try {
    await connectToDatabase();
    const {
      uid,
      name,
      phone,
      businessName,
      description,
      address,
      facebook,
      instagram,
      photoURL,
      email,
    } = await req.json();

    if (!uid || !email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    let seller = await Seller.findOne({ uid });

    if (seller) {
      // ✅ Update existing seller profile
      seller = await Seller.findOneAndUpdate(
        { uid },
        {
          name,
          phone,
          businessName,
          description,
          address,
          facebook,
          instagram,
          photoURL,
        },
        { new: true }
      );
    } else {
      // ✅ Create new seller profile
      seller = new Seller({
        uid,
        name,
        phone,
        businessName,
        description,
        address,
        facebook,
        instagram,
        email,
        photoURL,
      });
      await seller.save();
    }

    return NextResponse.json(
      { message: "Profile updated successfully", seller },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating seller profile:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
