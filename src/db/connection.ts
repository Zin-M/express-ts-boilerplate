import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv(); // Load environment variables from .env

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL as string;
  try {
    await mongoose.connect(mongoUrl);
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
    process.exit(1);
  }
};

export default connectDB;