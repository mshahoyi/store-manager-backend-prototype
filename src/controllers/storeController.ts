import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { paginatedResponseBuilder } from "../utils/paginationUtils";
import { catchAsync } from "../utils/catchAsync";
import path from "path";

export const extractCreateStorePayload = (req: Request, res: Response, next: NextFunction) => {
  req.body.payload = {
    name: req.body.name,
    logo: path.basename(req.file.originalname),
  };

  next();
};

export const writeStore = (isUpdate: boolean) =>
  catchAsync(async (req: Request, res: Response) => {
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

    res.status(201).json(store);
  });

export const getStores = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // only get one store if param is provided
  if (req.params.id) {
    const id = Number(req.params.id);
    const data = await prisma.store.findUnique({ where: { id } });
    return res.status(200).json(data);
  }

  const data = await prisma.store.findMany({ ...req.paginationQueries });
  const count = await prisma.store.count();
  return res.status(200).json(paginatedResponseBuilder(req, data, count));
});

export const deleteStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const store = await prisma.store.delete({ where: { id } });
  res.status(200).json(store);
});
