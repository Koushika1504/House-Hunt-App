 import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    rent: { type: Number, required: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // owner reference
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
