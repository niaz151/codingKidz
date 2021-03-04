import express, { json, Request, Response, urlencoded } from "express";
import helmet from "helmet";
import winston from "winston";

import { router } from "./src/routes";

import { PORT, Logger } from "./src/utils";

const app = express();

// Sets a lot of secure defaults
app.use(helmet());

app.use(json());
app.use(urlencoded({ extended: true }));

// Logger
app.use(Logger);

// Use routes defined in ./routes/index/ts
app.use("/", router);

// Display message upon server startup
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
