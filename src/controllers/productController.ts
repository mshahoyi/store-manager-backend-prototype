import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';
import { catchAsync } from '../utils/catchAsync';
import { paginatedResponseBuilder } from '../utils/paginationUtils';
import { addBaseUrl, extractObjectFields } from '../utils/sharedUtils';
import { Product } from '@prisma/client';
import { reach } from 'yup';

export const extractCreateProductPayload = (req: Request, res: Response, next: NextFunction) => {
  const payload = {} as Record<string, unknown>;
  if (req.body.name) payload.name = req.body.name;
  if (req.body.price) payload.price = Number(req.body.price);
  if (req.body.categoryId) payload.categoryId = Number(req.body.categoryId);
  if (req.body.storeId) payload.storeId = Number(req.body.storeId);
  if (req.file) payload.image = '/' + req.file?.path.split('/').slice(1).join('/');

  req.body.payload = payload;
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

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  // only get one category if param is provided
  if (req.params.id) {
    const id = Number(req.params.id);
    const data = await prisma.product.findUnique({ where: { id }, include: { category: true } });
    addBaseUrl('product', req, data);
    return res.status(200).json(data);
  }

  const storeId = Number(req.params.storeId);
  const data = (await prisma.product.findMany({
    ...req.paginationQueries,
    where: { storeId },
    include: { category: true },
  })) as Product[];
  data.forEach((product) => addBaseUrl('product', req, product));
  const count = await prisma.product.count();
  return res.status(200).json(paginatedResponseBuilder(req, data, count));
});

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const product = await prisma.product.delete({ where: { id } });
  res.status(200).json(product);
});
