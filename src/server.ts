import express from "express";
import morgan from "morgan";
import cors from "cors";
import { globalErrorHandler } from "Exceptions";

export const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", (_, __, next) => next());
app.use("/api", (_, __, next) => next());

app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);