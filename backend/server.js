import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB **before** starting the server
connectDB()
  .then(() => {
    console.log("Database connected successfully!");

    const app = express();

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    const corsOptions = {
      origin: "http://localhost:5173",
      credentials: true,
    };
    app.use(cors(corsOptions));

    // Routes
    app.use("/auth", authRoutes);
    app.use("/employee", employeeRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running successfully on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process if DB connection fails
  });
