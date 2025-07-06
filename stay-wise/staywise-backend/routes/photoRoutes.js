import express from "express";
import { upload, uploadPhoto } from "../controllers/photoController.js";

const router = express.Router();

// POST /api/photos/upload
router.post("/upload", upload.single("file"), uploadPhoto);

export default router;
