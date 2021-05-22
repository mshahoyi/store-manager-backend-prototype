import express from "express";
import { protect } from "../controllers/authController";
import { upload } from "../utils/multer";
import {
  deleteCategory,
  extractCreateCategoryPayload,
  getCategories,
  writeCategory,
} from "../controllers/categoryController";
import { validatePayload } from "../controllers/sharedController";
import { createCategorySchema } from "../model/categoryModel";

const categoryRoute = express.Router();

categoryRoute.post(
  "/",
  protect,
  upload.single("image"),
  extractCreateCategoryPayload,
  validatePayload(createCategorySchema),
  writeCategory(false)
);

categoryRoute.patch(
  "/:id",
  protect,
  upload.single("image"),
  extractCreateCategoryPayload,
  writeCategory(true)
);

categoryRoute.get("/:id?", protect, getCategories);

categoryRoute.delete("/:id", protect, deleteCategory);

export default categoryRoute;
