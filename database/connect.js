import mongoose from "mongoose";
// const mongoose = require("mongoose");

export const connectDB = async (connectionString) => {
  try {
    await mongoose.connect(connectionString);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};
