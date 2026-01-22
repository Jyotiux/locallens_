/**
 * spotRoutes.js
 * Defines all API routes related to "spots" and maps them to controller functions.
 * Handles request routing and attaches middleware where required.
 */

const express = require("express");
const router = express.Router();

const spotController = require("../controllers/spotController");
const multer = require("multer");

// Configure Multer for temporary file storage
const upload = multer({ dest: "uploads/" });

// -------------------- Routes --------------------

/**
 * @route   POST /api/spots
 * @desc    Create a new spot with multiple image uploads
 * @access  Public
 */
router.post("/spots", upload.array("images", 5), spotController.createSpot);

/**
 * @route   GET /api/spots
 * @desc    Retrieve all spots (with optional filters)
 * @access  Public
 */
router.get("/spots", spotController.getAllSpots);

module.exports = router;
