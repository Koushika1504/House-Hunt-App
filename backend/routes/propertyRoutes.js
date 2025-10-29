import express from "express";
import multer from "multer";
import Property from "../models/propertyModel.js";

const router = express.Router();

// --- MULTER SETUP ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// --- POST: Add a new property ---
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, location } = req.body;

    const property = new Property({
      title,
      description,
      price,
      location,
      image: req.file ? req.file.filename : null,
      available: true,
    });

    await property.save();
    res.json({ message: "✅ Property added successfully", property });
  } catch (err) {
    console.error("❌ Error adding property:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- GET: Fetch all properties ---
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error("❌ Error fetching properties:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
