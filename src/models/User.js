const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photoURL: { type: String },
  role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer" },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
