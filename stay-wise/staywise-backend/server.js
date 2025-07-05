import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; 
import ownerRoutes from "./routes/ownerRoutes.js";
import dotenv from "dotenv"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT|4000;
console.log(PORT);

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/owners", ownerRoutes);



mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT,'0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
