import express from "express";
import {
  extractCreateStorePayload,
  validateCreateStore,
  writeStore,
} from "../controllers/storeController";
import multer from "multer";

// multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.match(/\..*/);
    cb(null, file.fieldname + "-" + Date.now() + extension);
  },
});

const upload = multer({ storage: storage });

const storeRoute = express.Router();

storeRoute.post(
  "/",
  upload.single("logo"),
  extractCreateStorePayload,
  validateCreateStore,
  writeStore(false)
);

storeRoute.patch(
  "/:id",
  upload.single("logo"),
  extractCreateStorePayload,
  writeStore(true)
);

export default storeRoute;
