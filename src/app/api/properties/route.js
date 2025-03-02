import { NextResponse } from "next/server";
import Property from "@/models/Property";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { title, description, price, size, location, imageUrl, ownerId } =
      await req.json();

    // Validate required fields
    if (!title || !price || !size || !location || !ownerId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new property
    const newProperty = new Property({
      title,
      description,
      price,
      size,
      location,
      imageUrl,
      ownerId,
    });

    await newProperty.save();

    return NextResponse.json(
      { message: "Property added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding property:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all properties from MongoDB
    const properties = await Property.find({});

    return NextResponse.json(properties.length ? properties : [], {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
