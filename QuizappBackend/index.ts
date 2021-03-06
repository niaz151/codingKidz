import express, { json, urlencoded } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

import { router } from "./src/routes";

import { PORT } from "./src/utils";
import winston from "winston";
import expressWinston from "express-winston";
import { ErrorMiddleware } from "./src/middleware";

const app = express();

// Enable CORS requests
app.use(cors());

// Sets a lot of secure defaults
app.use(helmet());

// Compresses responses
app.use(compression());

app.use(json());
app.use(urlencoded({ extended: true }));

// Enable logging of req.body
expressWinston.requestWhitelist.push("body");

// Request Logger must be before routes are defined
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "logs/winston.log",
      }),
    ],
    format: winston.format.combine(
      winston.format.cli({
        all: true,
      })
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}} {{res.responseTime}}ms {{req.body}} {{res}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  })
);

// Ugly but simple logger that comes in clutch sometimes
app.use("/", (req, res, next) => {
  console.log("req body", req.body);
  return next();
});

// Use routes defined in ./routes/index/ts
app.use("/", router);

// Error logger must be after routes are defined
app.use(ErrorMiddleware.errorMiddleware);
// app.use(
//   expressWinston.errorLogger({
//     transports: [new winston.transports.Console()],
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//     ),
//   })
// );

// Display message upon server startup
app.listen(PORT, () => {
  console.log(`??????[server]: Server is running at https://localhost:${PORT}`);
});
