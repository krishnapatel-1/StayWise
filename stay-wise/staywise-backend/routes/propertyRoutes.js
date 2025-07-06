import express from "express";
import { savePropertyDetails } from "../controllers/propertyDetailController.js";

const router = express.Router();

router.post("/submit", savePropertyDetails);

export default router;
