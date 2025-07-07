import express from "express";
import {
  savePropertyDetails,
  getPropertiesByOwner
} from "../controllers/propertyDetailController.js";

const router = express.Router();

// Existing routes
router.post("/submit", savePropertyDetails);

// ✅ Missing route that causes your 404
router.get("/owner/:ownerId", getPropertiesByOwner);

export default router;
