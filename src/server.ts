import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AppError } from "@/utils";
import { globalErrorHandler } from "@/exceptions";
import { userRouter } from "./router";

export const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/company", (_, __, next) => next());

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
