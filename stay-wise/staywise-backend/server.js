import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const Grid = require("gridfs-stream");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));

// Enable CORS and JSON parsing
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/photos", photoRoutes); // 📸 photo upload route
app.use("/api/properties", propertyRoutes);

// MongoDB + GridFS setup
let gfs;
let gridfsBucket;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const conn = mongoose.connection;

    // GridFS bucket for storing files
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "Propertyuploads" // 💾 custom bucket name
    });

    // Initialize GridFS stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("Propertyuploads"); // ⚠️ important: set correct collection

    console.log("✅ MongoDB connected & GridFS initialized");

    // Start server
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Export for use in controllers
export { gfs, gridfsBucket };
