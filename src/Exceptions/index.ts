import { AppError } from "@/utils";
import { handleJWTError, handleJWTExpiredToken } from "./authExceptions";
import { sendErrorDev, sendErrorProd } from "./exceptionHandlers";
import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredToken();

    sendErrorProd(error, req, res);
  }
};
