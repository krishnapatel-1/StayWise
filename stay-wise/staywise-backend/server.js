import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; 
import dotenv from "dotenv"; 
import Grid from 'gridfs-stream';
const conn = mongoose.connection;
dotenv.config();

const app = express();
const PORT = process.env.PORT |4000;
console.log(PORT);

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
