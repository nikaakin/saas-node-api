import "tsconfig-paths/register";
import * as dotenv from "dotenv";
dotenv.config();

import { app } from "@/server";
import { appConfig } from "@/config";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

const server = app.listen(appConfig.port, () => {
  console.log(`server is on http://localhost:${appConfig.port}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(err.name, err.message);
  server.close((closeErr) => {
    console.log("unhandled rejection closing server: ", closeErr);
    process.exit(1);
  });
});
