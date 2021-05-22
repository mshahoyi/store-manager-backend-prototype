import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { catchAsync } from "../utils/catchAsync";
import { paginatedResponseBuilder } from "../utils/paginationUtils";

export const extractCreateProductPayload = (req: Request, res: Response, next: NextFunction) => {
  req.body.payload = {
    name: req.body.name,
    image: req.file?.path.split("/").slice(1).join("/"),
    categoryId: Number(req.body.categoryId),
  };

  next();
};

export const writeProduct = (isUpdate: boolean) =>
  catchAsync(async (req: Request, res: Response) => {
    let product;
    if (isUpdate) {
      const id = Number(req.params.id);
      product = await prisma.product.update({
        where: { id },
        data: req.body.payload,
      });
    } else {
      product = await prisma.product.create({ data: req.body.payload });
    }

    res.status(201).json(product);
  });

export const getProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // only get one category if param is provided
  if (req.params.id) {
    const id = Number(req.params.id);
    const data = await prisma.product.findUnique({ where: { id }, include: { category: true } });
    return res.status(200).json(data);
  }

  const data = await prisma.product.findMany({
    ...req.paginationQueries,
    include: { category: true },
  });
  const count = await prisma.product.count();
  return res.status(200).json(paginatedResponseBuilder(req, data, count));
});

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const product = await prisma.product.delete({ where: { id } });
  res.status(200).json(product);
});
