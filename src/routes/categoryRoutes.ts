import express from "express";
import {
  deleteStore,
  extractCreateStorePayload,
  getStores,
  validateCreateStore,
  writeStore,
} from "../controllers/storeController";
import { protect } from "../controllers/authController";
import { upload } from "../utils/multer";

const categoryRoute = express.Router();

categoryRoute.post(
  "/",
  protect,
  upload.single("image"),
  extractCreateStorePayload,
  validateCreateStore,
  writeStore(false)
);

categoryRoute.patch(
  "/:id",
  protect,
  upload.single("image"),
  extractCreateStorePayload,
  writeStore(true)
);

categoryRoute.get("/:id?", protect, getStores);

categoryRoute.delete("/:id", protect, deleteStore);

export default categoryRoute;
