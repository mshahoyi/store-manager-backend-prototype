import express from "express";
import {
  deleteStore,
  extractCreateStorePayload,
  getStores,
  validateCreateStore,
  writeStore,
} from "../controllers/storeController";
import multer from "multer";
import { protect } from "../controllers/authController";

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
  protect,
  upload.single("logo"),
  extractCreateStorePayload,
  validateCreateStore,
  writeStore(false)
);

storeRoute.patch(
  "/:id",
  protect,
  upload.single("logo"),
  extractCreateStorePayload,
  writeStore(true)
);

storeRoute.get("/:id?", protect, getStores);

storeRoute.delete("/:id", protect, deleteStore);

export default storeRoute;
