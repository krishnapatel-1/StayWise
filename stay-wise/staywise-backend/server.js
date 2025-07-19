import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import selectedRoutes from "./routes/selectedRoom.js";
import { otpRouter } from "./routes/otpRoutes.js";
// ✅ CORRECTED IMPORT: Using a default import to match the new export style.
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/otp", otpRouter);
app.use("/api/bookings", bookingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.use("/api/users", userRoutes);
    app.use("/api/properties", propertyRoutes);
    app.use("/api", locationRoutes);
    app.use("/api", selectedRoutes);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
