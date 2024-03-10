import { AppError } from "@/utils";
import { handleJWTError, handleJWTExpiredToken } from "./authExceptions";
import { sendErrorDev, sendErrorProd } from "./exceptionHandlers";
import { NextFunction, Request, Response } from "express";
import { appConfig } from "@/config";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (appConfig.env === "development") {
    sendErrorDev(err, req, res);
  } else if (appConfig.env === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredToken();

    sendErrorProd(error, req, res);
  }
};
