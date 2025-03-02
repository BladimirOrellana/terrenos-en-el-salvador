import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SavedProperty from "@/models/SavedProperty";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { userId, propertyId } = await req.json();

    if (!userId || !propertyId) {
      return NextResponse.json(
        { message: "Missing userId or propertyId" },
        { status: 400 }
      );
    }

    // Check if the property is already saved
    const existingSave = await SavedProperty.findOne({ userId, propertyId });

    if (existingSave) {
      // If exists, remove it (unsave)
      await SavedProperty.deleteOne({ userId, propertyId });
      return NextResponse.json(
        { message: "Property removed from saved list" },
        { status: 200 }
      );
    }

    // If not saved, create a new saved property
    const newSave = new SavedProperty({ userId, propertyId });
    await newSave.save();

    return NextResponse.json(
      { message: "Property saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving property:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    // Fetch saved properties
    const savedProperties = await SavedProperty.find({ userId }).populate(
      "propertyId"
    );

    return NextResponse.json(savedProperties, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved properties:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
