import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { catchAsync } from "../utils/catchAsync";
import { paginatedResponseBuilder } from "../utils/paginationUtils";

export const extractCreateCategoryPayload = (req: Request, res: Response, next: NextFunction) => {
  req.body.payload = {
    name: req.body.name,
    image: req.file?.path.split("/").slice(1).join("/"),
    storeId: Number(req.body.storeId),
  };

  next();
};

export const writeCategory = (isUpdate: boolean) =>
  catchAsync(async (req: Request, res: Response) => {
    let category;
    if (isUpdate) {
      const id = Number(req.params.id);
      category = await prisma.category.update({
        where: { id },
        data: req.body.payload,
      });
    } else {
      category = await prisma.category.create({ data: req.body.payload });
    }

    res.status(201).json(category);
  });

export const getCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // only get one category if param is provided
  if (req.params.id) {
    const id = Number(req.params.id);
    const data = await prisma.category.findUnique({ where: { id }, include: { store: true } });
    return res.status(200).json(data);
  }

  const data = await prisma.category.findMany({
    ...req.paginationQueries,
    include: { store: true },
  });
  const count = await prisma.category.count();
  return res.status(200).json(paginatedResponseBuilder(req, data, count));
});

export const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const store = await prisma.category.delete({ where: { id } });
    res.status(200).json(store);
  }
);
