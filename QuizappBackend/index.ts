import express, { json, Request, Response, urlencoded } from "express";
import helmet from "helmet";
import winston from "winston";
import expressWinston from "express-winston";

import { router } from "./src/routes";

import { PORT } from "./src/utils";

const app = express();

// Sets a lot of secure defaults
app.use(helmet());

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req: Request, res: Response) {
      return false;
    }, // optional: allows to skip some log messages based on request and/or response
  })
);

// Use routes defined in ./routes/index/ts
app.use("/", router);

// Display message upon server startup
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
