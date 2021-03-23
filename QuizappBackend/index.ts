import express, { json, urlencoded } from "express";
import helmet from "helmet";
import compression from "compression";

import { router } from "./src/routes";

import { PORT } from "./src/utils";

const app = express();

// Sets a lot of secure defaults
app.use(helmet());

// Compresses responses
app.use(compression());

app.use(json());
app.use(urlencoded({ extended: true }));

// Logger
// app.use(Logger);

// Use routes defined in ./routes/index/ts
app.use("/", router);

// Display message upon server startup
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
