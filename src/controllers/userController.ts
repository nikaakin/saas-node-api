import { compare, hash } from "bcrypt";
import { db } from "@/db";
import { LoginBodyType, SignUpBodyType } from "@/types";
import { AppError } from "@/utils";
import { Request, Response } from "express";
import { appConfig } from "@/config";
import { createJWT } from "@/helpers";

export const signup = async (req: Request, res: Response) => {
  const { name, password, email } = req.body as SignUpBodyType;

  try {
    const user = await db.user.create({
      data: {
        name,
        password: await hash(password, appConfig.secrets.jwt),
        email,
      },
    });

    const token = createJWT(user);

    return res.json({ user, token }).status(201);
  } catch (error) {
    throw new AppError("user already exists", 400);
  }
};

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body as LoginBodyType;

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

  const token = createJWT(user);

  return res.json({ user, token }).status(200);
};
