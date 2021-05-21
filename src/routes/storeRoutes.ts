import express, { NextFunction, Request, Response } from "express";
import {
  extractCreateStorePayload,
  validateCreateStore,
  writeStore,
} from "../controllers/storeController";
import multer from "multer";
import prisma from "../prisma";
import { paginatedResponseBuilder } from "../utils/paginationUtils";

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

storeRoute.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const data = await prisma.store.findMany({ ...req.paginationQueries });
  res.status(200).json(paginatedResponseBuilder(req, data, 11));
});

export default storeRoute;
