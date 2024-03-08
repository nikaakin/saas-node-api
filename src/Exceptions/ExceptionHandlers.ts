import { Response } from "express";
import { AppError } from "@/utils";

export const sendErrorDev = (err: AppError, _, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const sendErrorProd = (err: AppError, _, res: Response) => {
  if (err.isOperation) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "something went wrong",
  });
};
