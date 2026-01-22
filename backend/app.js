/**
 * app.js
 * Entry point for the Express backend server.
 * Responsible for initializing the server, connecting to the database,
 * configuring global middleware, and mounting API routes.
 */

// Core dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Database connection utility
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Establish MongoDB connection
connectDB();

// -------------------- Global Middleware --------------------

// Enable Cross-Origin Resource Sharing for frontend communication
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// -------------------- Routes --------------------

// Mount all spot-related routes under /api
const spotRoutes = require("./routes/spotRoutes");
app.use("/api", spotRoutes);

// -------------------- Server Startup --------------------

// Start the server on configured port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
