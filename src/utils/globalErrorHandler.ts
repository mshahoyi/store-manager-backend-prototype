import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import multer from "multer";
import { PrismaClientValidationError } from "@prisma/client/runtime";

const globalErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  // Do not return a response if headers have already been sent
  if (res.headersSent) {
    return next(error);
  }

  // Handle Yup js validation errors
  if (error instanceof ValidationError) {
    return res.status(422).json(error);
  }

  // File upload errors
  if (error instanceof multer.MulterError) {
    return res.status(422).json(error.message);
  }

  // Prisma Validation Errors
  if (error instanceof PrismaClientValidationError) {
    return res.status(422).json(error.message);
  }

  next(error);
};

export default globalErrorHandler;
