import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending", // can be Pending, Approved, Rejected
  },
});

export default mongoose.model("Booking", bookingSchema);
