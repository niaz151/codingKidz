import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { json } from "body-parser";

import configPassport from "./src/config/passport";

import { authRouter, secureRouter } from "./src/routes";

import { PORT, MONGO_URI } from "./src/utils";

const app = express();

app.use(json());
app.use(passport.initialize());
configPassport();

mongoose.connect(
  MONGO_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to DB");
  }
);
mongoose.connection.on("error", (error) => console.log(error));

app.use("/api/auth", authRouter);
app.use(
  "/api/user",
  passport.authenticate("JWT", { session: false }),
  secureRouter
);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
