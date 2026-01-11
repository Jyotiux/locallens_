const Spot = require("../models/Spot");
const cloudinary = require("../utils/cloudinary");

exports.createSpot = async (req, res) => {
    // console.log("Received files:", req.files);

  try {
    const { title, description, category, lat, lng } = req.body;
    const imageUrls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
    }

    const newSpot = new Spot({
      title,
      description,
      category,
      coordinates: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      imageUrls,
    });

    await newSpot.save();
    res.status(201).json({ message: "Spot created Successfully", spot: newSpot });
  } catch (error) {
    console.error("Error while creating spot:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// to display last 4 spots
exports.getAllSpots = async (req, res) => {
  try {
    const spots = await Spot.find().sort({ createdAt: -1 }).limit(4);
    res.json(spots);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch spots" });
  }
};
