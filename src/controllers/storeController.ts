import { NextFunction, Request, Response } from "express";
import { createStoreSchema } from "../model/storeModel";
import prisma from "../prisma";

export const extractCreateStorePayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.payload = {
    name: req.body.name,
    logo: req.file?.path.split("/").slice(1).join("/"),
  };

  next();
};

export const validateCreateStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  createStoreSchema
    .validate(req.body.payload)
    .then(() => next())
    .catch(next);
};

export const writeStore =
  (isUpdate: boolean) => async (req: Request, res: Response) => {
    let store;
    if (isUpdate) {
      const id = Number(req.params.id);
      store = await prisma.store.update({
        where: { id },
        data: req.body.payload,
      });
    } else {
      store = await prisma.store.create({ data: req.body.payload });
    }

    res.status(201).json({ status: "success", data: store });
  };
