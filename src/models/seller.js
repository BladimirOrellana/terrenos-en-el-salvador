import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase User ID
  name: { type: String, required: true },
  phone: { type: String, default: "" },
  businessName: { type: String, default: "" },
  description: { type: String, default: "" },
  address: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  photoURL: { type: String, default: "" },
  facebook: { type: String, default: "" },
  instagram: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Seller || mongoose.model("Seller", SellerSchema);
