import express from "express";
import {
  deleteStore,
  extractCreateStorePayload,
  getStores,
  writeStore,
} from "../controllers/storeController";
import { protect } from "../controllers/authController";
import { upload } from "../utils/multer";
import { validatePayload } from "../controllers/sharedController";
import { createStoreSchema } from "../model/storeModel";

const storeRoute = express.Router();

storeRoute.post(
  "/",
  protect,
  upload.single("logo"),
  extractCreateStorePayload,
  validatePayload(createStoreSchema),
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
