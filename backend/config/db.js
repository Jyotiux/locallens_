/**
 * db.js
 * Utility function to establish a connection with MongoDB using Mongoose.
 * This is executed once when the server starts.
 */

const mongoose = require("mongoose");

/**
 * Connects to MongoDB using the connection string from environment variables.
 * Terminates the process if the connection fails.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
