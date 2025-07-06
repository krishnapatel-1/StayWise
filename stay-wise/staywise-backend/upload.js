import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    const { ownerId, label } = req.body;

    return {
      filename: `${ownerId}_${Date.now()}_${file.originalname}`,
      bucketName: "Propertyuploads", // same as GridFS collection
      metadata: {
        ownerId,
        label,
      },
    };
  },
});

const upload = multer({ storage });

export default upload;
