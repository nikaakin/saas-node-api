import { AppError } from "@/utils";

export const handleJWTError = () =>
  new AppError("invalid token. Please log in again!", 401);

export const handleJWTExpiredToken = () =>
  new AppError("Token has expired. Please log in again", 401);
