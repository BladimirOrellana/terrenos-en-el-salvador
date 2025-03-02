import mongoose from "mongoose";

const SavedPropertySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Firebase UID
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SavedProperty ||
  mongoose.model("SavedProperty", SavedPropertySchema);
