const Spot = require("../models/Spot");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs").promises;

/**
 * @desc    Create a new spot with images and coordinates
 * @route   POST /api/spots
 * @access  Public
 */
exports.createSpot = async (req, res) => {
  console.log("👉 Incoming request to createSpot");
  console.log("📦 Body received:", req.body);
  console.log("📁 Files received:", req.files?.length || 0);

  try {
    const { title, description, category, lat, lng } = req.body;

    // STEP 1: Basic input validation
    // Ensure required fields are present
    if (!title || !category || lat === undefined || lng === undefined) {
      console.log("❌ Validation failed: Missing fields", {
        title,
        category,
        lat,
        lng,
      });
      return res.status(400).json({
        message: "Title, category and coordinates are required",
      });
    }

    // STEP 2: Validate that latitude and longitude are valid numbers
    if (isNaN(lat) || isNaN(lng)) {
      console.log("❌ Validation failed: Invalid coordinates", { lat, lng });
      return res.status(400).json({
        message: "Latitude and longitude must be numbers",
      });
    }

    console.log("✅ Validation passed, proceeding with upload and save");

    // Array to store Cloudinary image URLs
    const imageUrls = [];

    // STEP 3: Process uploaded files (if any)
    // - Upload each file to Cloudinary
    // - Store secure URL
    // - Delete temporary local file after upload
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          // Upload image to Cloudinary
          const result = await cloudinary.uploader.upload(file.path);

          // Save the hosted image URL
          imageUrls.push(result.secure_url);
        } catch (uploadErr) {
          console.error("Upload failed for file:", file.path, uploadErr);
        } finally {
          // Always attempt to clean up the temporary local file
          try {
            await fs.unlink(file.path);
          } catch (unlinkErr) {
            console.error("Failed to delete local file:", file.path, unlinkErr);
          }
        }
      }
    }

    // STEP 4: Create a new Spot document
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

    // STEP 5: Save spot to MongoDB
    await newSpot.save();

    // Respond with success
    res.status(201).json({
      message: "Spot created successfully",
      spot: newSpot,
    });
  } catch (error) {
    // Catch any unexpected server or database errors
    console.error("Error while creating spot:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get all spots with optional category filter and limit
 * @route   GET /api/spots?limit=4&category=Nature
 * @access  Public
 */
exports.getAllSpots = async (req, res) => {
  try {
    console.log("👉 Incoming request to getAllSpots");
    console.log("🔍 Query params:", req.query);

    // STEP 1: Read query parameters
    const limit = parseInt(req.query.limit) || 4;
    const category = req.query.category;

    // STEP 2: Build MongoDB filter dynamically
    // If category is provided, filter by category
    // Otherwise, fetch all spots
    const filter = category ? { category } : {};

    // STEP 3: Fetch spots from database
    // - Sort by latest created
    // - Apply result limit
    const spots = await Spot.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit);

    console.log(
      `✅ Found ${spots.length} spots (limit: ${limit}, category: ${category || "all"})`
    );

    // STEP 4: Send response to client
    res.json(spots);
  } catch (error) {
    // Handle database or server errors
    console.error("❌ Failed to fetch spots:", error);
    res.status(500).json({ message: "Failed to fetch spots" });
  }
};
