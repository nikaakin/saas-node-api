import { db } from "@/db";
import { SignUpBodyType } from "@/types";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const { name, password, email } = req.body as SignUpBodyType;

  const user = await db.user.create({
    data: {
      name,
      password,
      email,
    },
  });

  return res.json({ user });
};
