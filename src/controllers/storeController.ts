import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';
import { paginatedResponseBuilder } from '../utils/paginationUtils';
import { catchAsync } from '../utils/catchAsync';
import { addBaseUrl, extractObjectFields } from '../utils/sharedUtils';
import { Store } from '@prisma/client';

export const extractCreateStorePayload = (req: Request, res: Response, next: NextFunction) => {
  req.body.payload = extractObjectFields(req.body, ['name']);
  if (req.file) {
    req.body.payload.logo = '/' + req.file?.path.split('/').slice(1).join('/');
  }

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

export const getStores = catchAsync(async (req: Request, res: Response) => {
  // only get one store if param is provided
  if (req.params.id) {
    const id = Number(req.params.id);
    const data = await prisma.store.findUnique({ where: { id } });
    addBaseUrl('store', req, data as Store);
    return res.status(200).json(data);
  }

  const data = await prisma.store.findMany();
  data.forEach((store) => addBaseUrl('store', req, store));
  return res.status(200).json(data);
});

export const deleteStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const store = await prisma.store.delete({ where: { id } });
  res.status(200).json(store);
});
