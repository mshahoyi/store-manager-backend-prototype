import { NextFunction, Request, Response } from 'express';
import { Category } from '@prisma/client';
import prisma from '../prisma';
import { catchAsync } from '../utils/catchAsync';
import { paginatedResponseBuilder } from '../utils/paginationUtils';
import { addBaseUrl, extractObjectFields } from '../utils/sharedUtils';

export const extractCreateCategoryPayload = (req: Request, res: Response, next: NextFunction) => {
  req.body.payload = extractObjectFields<Category>(req.body, ['name', 'storeId']);
  req.body.payload.storeId = Number(req.body.payload.storeId);
  if (req.file) {
    req.body.payload.image = '/' + req.file?.path.split('/').slice(1).join('/');
  }
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

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  // only get one category if param is provided
  if (req.params.id) {
    const id = Number(req.params.id);
    const data = await prisma.category.findUnique({ where: { id }, include: { store: true } });
    addBaseUrl('category', req, data);

    return res.status(200).json(data);
  }

  const data = (await prisma.category.findMany({
    ...req.paginationQueries,
    include: { store: true },
  })) as Category[];
  data.forEach((category) => addBaseUrl('category', req, category));
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

export const listCategories = catchAsync(async (req: Request, res: Response) => {
  const storeId = Number(req.params.storeId);
  const data = await prisma.category.findMany({ where: { storeId } });
  res.status(200).json(data);
});
