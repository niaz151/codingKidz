import express, { json } from "express";
import mongoose from "mongoose";

import { router } from "./src/routes";

import { PORT, MONGO_URI } from "./src/utils";

const app = express();

app.use(json());

// Display messages on server connect / fail
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

// Use routes defined in ./routes/index/ts
app.use("/", router);

// Display message upon server startup
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
