// lib/db.ts
import mongoose from "mongoose";

const { MONGO_CONNECTION_URL } = process.env;

let isConnected = false;

export const db = async () => {
  if (isConnected) {
    return;
  }

  if (!MONGO_CONNECTION_URL) {
    throw new Error("MongoDB connection URL is not defined");
  }

  try {
    const { connection } = await mongoose.connect(MONGO_CONNECTION_URL);
    if (connection.readyState === 1) {
      isConnected = true;
      console.log("✅ MongoDB connected");
      return;
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

// MongoDB events — register once
mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("🔌 MongoDB disconnected");
});
mongoose.connection.on("reconnected", () => {
  console.log("🔁 MongoDB reconnected");
});
mongoose.connection.on("close", () => {
  console.log("❎ MongoDB connection closed");
});
