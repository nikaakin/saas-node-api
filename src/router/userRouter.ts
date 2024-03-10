import { login, signup } from "@/controllers";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
