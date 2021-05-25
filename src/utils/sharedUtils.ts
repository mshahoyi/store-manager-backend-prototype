import { Category, Product, Store } from '@prisma/client';
import { Request } from 'express';

export const addBaseUrl = (
  model: 'store' | 'product' | 'category',
  req: Request,
  data: Store | Category | Product | null
) => {
  if (data) {
    const baseUrl = req.protocol + '://' + req.get('host') + '/';

    switch (model) {
      case 'store':
        (data as Store).logo = baseUrl + (data as Store).logo;
        break;

      case 'category':
      case 'product':
        (data as Category | Product).image = baseUrl + (data as Category | Product).image;
        break;

      default:
        throw new Error('unknown model for adding base url');
    }
  }
};

export const extractObjectFields = <T>(object: T, fields: (keyof T)[]) => {
  if (typeof object !== 'object' || object === null) {
    throw new Error('can not take non object or null for field extraction');
  }

  const obj = object as Record<keyof T, unknown>;
  const extraction = {} as Record<keyof T, unknown>;

  fields.forEach((field) => {
    if (obj[field] !== undefined) extraction[field] = obj[field];
  });

  return extraction;
};
