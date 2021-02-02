import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { json } from "body-parser";

import configPassport from "./src/config/passport";

import { authRouter, secureRouter } from "./src/routes";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(json());
app.use(passport.initialize());
configPassport();

mongoose.connect(
  `${process.env.MONGO_URI}`,
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

app.get("/api/test", (req, res) =>
  res.send({ message: "typescript + express ftw" })
);

app.use("/api/auth", authRouter);
app.use(
  "/api/user",
  passport.authenticate("JWT", { session: false }),
  secureRouter
);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
