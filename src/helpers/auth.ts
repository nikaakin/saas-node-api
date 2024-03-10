import { appConfig } from "@/config";
import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";

export const createJWT = (user: User, rememeber_me = false) => {
  const token = sign({ id: user.id, name: user.name }, appConfig.secrets.jwt, {
    expiresIn: rememeber_me
      ? appConfig.secrets.jwt_remember_me
      : appConfig.secrets.jwt_expires_in,
  });

  return token;
};
