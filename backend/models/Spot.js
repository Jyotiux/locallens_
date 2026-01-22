const mongoose = require("mongoose");

/**
 * Spot Schema
 * -----------
 * This schema defines the structure of a "Spot" document in MongoDB.
 * Each spot represents a user-added location with metadata, coordinates,
 * and associated image URLs.
 */
const spotSchema = new mongoose.Schema(
  {
    // Title of the spot (required field)
    title: {
      type: String,
      required: true,
    },

    // Optional short description about the place
    description: String,

    // Category of the spot (e.g., Nature, Spiritual, Scenic, Food, etc.)
    category: String,

    // Geographic coordinates of the spot
    // Used for map marker placement and highlighting
    coordinates: {
      lat: Number, // Latitude value
      lng: Number, // Longitude value
    },

    // Array of image URLs stored on Cloudinary
    // Supports multiple images per spot
    imageUrls: [String],
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export the Spot model based on the schema
module.exports = mongoose.model("Spot", spotSchema);
