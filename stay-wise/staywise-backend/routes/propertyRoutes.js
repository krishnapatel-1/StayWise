import express from "express";

// ✅ DEBUGGING: This log will appear in your terminal if the correct file is being loaded.
console.log("✅ --- Loading routes/propertyRoutes.js --- ✅");

// ✅ CORRECTED: Using the controller filename you created.
import {
  savePropertyDetails,
  getPropertiesByOwner,
  getPropertyById,
  toggleToLetStatus,
  allproperties,
  updatePropertyById,
  updatePropertyStatus,
} from "../controllers/propertyController.js";

const router = express.Router();

// This structure now correctly uses the named functions.
router.post("/submit", savePropertyDetails);
router.get("/owner/:ownerId", getPropertiesByOwner);
router.get("/all", allproperties);
router.get("/:propertyId", getPropertyById);
router.patch("/:propertyId/tolet", toggleToLetStatus);
router.put("/:propertyId", updatePropertyById);
router.put("/:propertyId/status", updatePropertyStatus);

export default router;
