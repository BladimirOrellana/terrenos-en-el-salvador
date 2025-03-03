import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  size: { type: Number, required: true },
  location: {
    department: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, default: "" },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  images: { type: [String], default: [] },
  ownerId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Named export for the model
export const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);
