import express from "express";
import Booking from "../models/bookingModel.js";

const router = express.Router();

// --- POST: Create a new booking ---
router.post("/add", async (req, res) => {
  try {
    const { userId, propertyId } = req.body;

    const booking = new Booking({
      user: userId,
      property: propertyId,
      status: "Pending",
    });

    await booking.save();
    res.json({ message: "✅ Booking created successfully", booking });
  } catch (err) {
    console.error("❌ Error creating booking:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- GET: Fetch all bookings ---
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("property", "title price location");
    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- PUT: Update booking status (Approve/Reject) ---
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: `Booking ${status}`, updatedBooking });
  } catch (err) {
    console.error("❌ Error updating booking:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
