import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, default: "/placeholder.jpg" },
    ownerId: { type: String, required: true }, // User ID of the seller
  },
  { timestamps: true }
);

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
