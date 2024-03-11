import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";

let envConfig: {
  port: number;
};

if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

export const appConfig = merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 8000,
    secrets: {
      jwt: process.env.JWT_SECRET,
      jwt_expires_in: process.env.JWT_EXPIRES_IN,
      jwt_remember_me: process.env.JWT_REMEMBER_ME_EXPIRES_IN,
      bcrypt_salt: process.env.BCRYPT_SALT,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
);
