import express, { json } from "express";


import { router } from "./src/routes";

import { PORT} from "./src/utils";

const app = express();

app.use(json());

// Use routes defined in ./routes/index/ts
app.use("/", router);

// Display message upon server startup
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
