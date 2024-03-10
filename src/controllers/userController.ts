import { compare, hash } from "bcrypt";
import { db } from "@/db";
import { LoginBodyType, SignUpBodyType } from "@/types";
import { AppError } from "@/utils";
import { Request, Response } from "express";
import { appConfig } from "@/config";
import { createJWT, makeVerificationToken } from "@/helpers";

export const signup = async (req: Request, res: Response) => {
  const { name, password, email } = req.body as SignUpBodyType;

  try {
    const user = await db.user.create({
      data: {
        name,
        password: await hash(password, appConfig.secrets.jwt),
        email,
        verification_token: makeVerificationToken(name),
      },
    });

    const token = createJWT(user);

    // send email

    return res.json({ user, token }).status(201);
  } catch (error) {
    throw new AppError("user already exists", 400);
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
