import { z } from "zod";

export const signupBodySchema = z.object({
  email: z.string({ required_error: "email is required" }).email(),
  password: z
    .string({ required_error: "password is required" })
    .min(8)
    .max(255),
  name: z.string({ required_error: "name is required" }).min(3).max(255),
});

export const loginBodySchema = z.object({
  name: z
    .string({
      required_error: "name or email is required",
    })
    .min(3)
    .max(255),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(8)
    .max(255),
});

export const verifyParamsSchema = z.object({
  id: z.string({
    required_error: "id is required",
  }),
  token: z.string({
    required_error: "token is required",
  }),
});

export const forgotPasswordBodySchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email(),
});

export const resetPasswordBodySchema = z.object({
  id: z.string({
    required_error: "id is required",
  }),
  token: z.string({
    required_error: "token is required",
  }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(8)
    .max(255),
});
