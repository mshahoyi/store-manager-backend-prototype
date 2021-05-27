import { NextFunction, Request, Response } from 'express';
import { URL } from 'url';

export const paginationQueryFormatter = (queries: Request['query']) => {
  const object: { take?: number; skip?: number; orderBy?: Record<string, 'desc' | 'asc'> } = {};

  // Offset
  if (queries.offset !== undefined) {
    object.skip = Number(queries.offset);
  }

  // Limit. It should not exceed 200
  const limit = Number(queries.limit);
  if (Number.isNaN(limit)) {
    object.take = 5;
  } else if (limit > 200) {
    object.take = 200;
  } else {
    object.take = limit;
  }

  // Can not take multiple sort fields
  if (Array.isArray(queries.orderBy)) {
    throw new Error('Can not handle multiple sort fields');
  }

  // Sorting
  if (queries.orderBy !== undefined) {
    const value = queries.orderBy as string;
    const isDescending = value.startsWith('-');
    const fieldName = value.slice(1);
    object.orderBy = { [fieldName]: isDescending ? 'desc' : 'asc' };
  }

  return object;
};

export const paginationQueryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.paginationQueries = paginationQueryFormatter(req.query);
  next();
};

export interface PaginatedResult<T> {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
  results: T[];
  count: number;
}

export const paginatedResponseBuilder = (
  req: Request,
  data: unknown[],
  count: number
): PaginatedResult<unknown> => {
  const object = {} as PaginatedResult<unknown>;

  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : 5;
  const isMultiple = limit < count;

  // Add first page
  const firstPage = new URL(url);
  firstPage.searchParams.set('offset', '0');
  object.first = isMultiple ? firstPage.toString() : null;

  // Add last page
  const last = new URL(url);
  last.searchParams.set('offset', String(count - limit < 0 ? 0 : count - limit));
  object.last = isMultiple ? last.toString() : null;

  // Add next page if available
  const hasNext = offset + limit < count;

  const next = new URL(url);
  next.searchParams.set('offset', String(offset + limit));
  object.next = hasNext ? next.toString() : null;

  // Add previous page if available
  const hasPrevious = offset > 0;
  const prev = new URL(url);
  prev.searchParams.set('offset', String(offset - limit < 0 ? 0 : offset - limit));
  object.prev = hasPrevious ? prev.toString() : null;

  object.results = data;
  object.count = count;

  return object;
};
