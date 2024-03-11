import { Router } from "express";
import {
  forgotPassword,
  login,
  signup,
  verify,
  resetPassword,
  sendVerificationEmail,
} from "@/controllers";
import { globalErrorHandler } from "@/exceptions";
import { bodyValidator } from "@/middlewares";
import { signupBodySchema } from "@/validators";

export const userRouter = Router();

userRouter.post("/signup", bodyValidator(signupBodySchema), signup);
userRouter.post("/login", login);
userRouter.get("/verify/:id/:token", verify);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/send-verification-email/:id", sendVerificationEmail);

userRouter.use(globalErrorHandler);
