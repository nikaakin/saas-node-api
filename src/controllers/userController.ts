import { compare, hash } from "bcrypt";
import { db } from "@/db";
import { LoginBodyType, SignUpBodyType } from "@/types";
import { AppError } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { appConfig } from "@/config";
import { createJWT, makeVerificationToken } from "@/helpers";
import * as jwt from "jsonwebtoken";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, password, email } = req.body as SignUpBodyType;
  try {
    const user = await db.user.create({
      data: {
        name,
        password: await hash(password, +appConfig.secrets.bcrypt_salt),
        email,
        verification_token: makeVerificationToken(name),
      },
    });

    // send email

    return res
      .json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          verified_at: user.verified_at,
        },
        message: "user created successfully, please verify your email.",
      })
      .status(201);
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const login = async (req: Request, res: Response) => {
  const { name, password, rememberMe } = req.body as LoginBodyType;

  const user = await db.user.findUnique({
    where: {
      name,
    },
  });

  if (!user) {
    throw new AppError("wrong password or name/email", 401);
  }

  if (!compare(password, user.password)) {
    throw new AppError("wrong password or name/email", 401);
  }

  if (user.verified_at === null) {
    throw new AppError("User is not verified.", 401);
  }

  const token = createJWT(user, rememberMe);

  return res.json({ user, token }).status(200);
};

export const verify = async (req: Request, res: Response) => {
  const { token, id } = req.params;
  try {
    jwt.verify(token, appConfig.secrets.jwt);
  } catch (err) {
    throw new AppError(err.message, 401);
  }

  const user = await db.user.findUnique({
    where: {
      id: id,
      verification_token: token,
    },
  });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      verified_at: new Date(),
    },
  });

  return res.json({ message: "user verified" }).status(200);
};

export const sendVerificationEmail = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  // send email

  return res.json({ message: "email sent" }).status(200);
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      reset_token: makeVerificationToken(user.name),
    },
  });

  // send email

  return res.json({ message: "email sent" }).status(200);
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, id, password } = req.body;

  const user = await db.user.findUnique({
    where: {
      id,
      reset_token: token,
    },
  });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await hash(password, appConfig.secrets.jwt),
    },
  });

  return res.json({ message: "password reset" }).status(200);
};
