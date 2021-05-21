import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import multer from "multer";

const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Do not return a response if headers have already been sent
  if (res.headersSent) {
    return next(error);
  }

  console.log("error", JSON.stringify(error, null, 2));

  // Handle Yup js validation errors
  if (error instanceof ValidationError) {
    return res.status(422).json({ status: "failed", data: error });
  }

  // File upload errors
  if (error instanceof multer.MulterError) {
    return res.status(422).json({ status: "failed", data: error.message });
  }

  next(error);
};

export default globalErrorHandler;
