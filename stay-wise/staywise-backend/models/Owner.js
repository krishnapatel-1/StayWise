import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    location: {type: String},
    role: { type: String, enum: ["customer", "owner"], default: "owner" }
  },
  { timestamps: true }
);

export default mongoose.model("Owner", ownerSchema);