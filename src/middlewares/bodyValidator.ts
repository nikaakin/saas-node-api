import { AppError } from "@/utils";
import { NextFunction, Request } from "express";
import { z } from "zod";

export const bodyValidator =
  (schema: z.Schema) => (req: Request, _, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const message = error.errors.map((err) => err.message).join(", ");

      next(new AppError(message, 400));
    }
  };
