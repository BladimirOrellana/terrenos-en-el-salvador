import { NextResponse } from "next/server";
import Property from "@/models/Property";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const propertyId = params?.id;

    if (!propertyId) {
      return NextResponse.json(
        { message: "Missing property ID" },
        { status: 400 }
      );
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const propertyId = params?.id;

    if (!propertyId) {
      return NextResponse.json(
        { message: "Missing property ID" },
        { status: 400 }
      );
    }

    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Property deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
