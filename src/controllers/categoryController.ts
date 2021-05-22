import { NextFunction, Request, Response } from "express";

export const extractCreateCategoryPayload = (req: Request, res: Response, next: NextFunction) => {
  req.body.payload = {
    name: req.body.name,
    logo: req.file?.path.split("/").slice(1).join("/"),
  };

  next();
};
