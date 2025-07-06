import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// GridFS Storage Configuration
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const { ownerId, label } = req.body;
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);

        const filename = `${label}-${buf.toString("hex")}${path.extname(file.originalname)}`;
        const fileInfo = {
          filename,
          bucketName: "Propertyuploads", // Custom bucket name
          metadata: {
            ownerId,
            label,
          },
        };
        resolve(fileInfo);
      });
    });
  },
});

// Initialize Multer with GridFS storage
export const upload = multer({ storage });

// Controller to respond after photo upload
export const uploadPhoto = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "Photo uploaded successfully",
    fileId: req.file.id,
    filename: req.file.filename,
    ownerId: req.file.metadata.ownerId,
    label: req.file.metadata.label,
  });
};
