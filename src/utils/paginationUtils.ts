import { NextFunction, Request, Response } from "express";
import { URL } from "url";

export const paginationQueryFormatter = (queries: Request["query"]) => {
  const object: { take?: number; skip?: number } = {};

  if (queries.offset !== undefined) {
    object.skip = Number(queries.offset);
  }

  object.take = queries.limit ? Number(queries.limit) : 10;

  return object;
};

export const paginationQueryMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.paginationQueries = paginationQueryFormatter(req.query);
  next();
};

export interface PaginatedResult<T> {
  first: string;
  last: string;
  next?: string;
  prev?: string;
  results: T[];
  count: number;
}

export const paginatedResponseBuilder = (
  req: Request,
  data: unknown[],
  count: number
): PaginatedResult<unknown> => {
  const object = {} as PaginatedResult<unknown>;

  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  // Add first page
  const firstPage = new URL(url);
  firstPage.searchParams.set("offset", "0");
  object.first = firstPage.toString();

  // Add last page
  const last = new URL(url);
  last.searchParams.set(
    "offset",
    String(count - limit < 0 ? 0 : count - limit)
  );
  object.last = last.toString();

  // Add next page if available
  if (offset + limit < count) {
    const next = new URL(url);
    next.searchParams.set("offset", String(offset + limit));
    object.next = next.toString();
  }

  // Add previous page if available
  if (offset > 0) {
    const prev = new URL(url);
    prev.searchParams.set(
      "offset",
      String(offset - limit < 0 ? 0 : offset - limit)
    );
    object.prev = prev.toString();
  }

  object.results = data;
  object.count = count;

  return object;
};
