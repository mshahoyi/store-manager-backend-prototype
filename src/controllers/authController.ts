import { NextFunction, Request, Response } from "express";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  // this is a dummy protect function
  next();
};
