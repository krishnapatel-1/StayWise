import express from "express";
import {
  savePropertyDetails,
  getPropertiesByOwner,
  getPropertyById,        // ✅ Make sure this is imported
  toggleToLetStatus,
  allproperties,      // ✅ Also import this
} from "../controllers/propertyDetailController.js";

const router = express.Router();

router.post("/submit", savePropertyDetails);
router.get("/owner/:ownerId", getPropertiesByOwner);
router.get("/all", allproperties)
router.get("/:propertyId", getPropertyById);   // ✅ Single property route
router.patch("/:propertyId/tolet", toggleToLetStatus); // ✅ Toggle To-Let

export default router;
