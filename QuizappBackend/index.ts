import express from "express";

const app = express();
const PORT = 8000;
app.get("/api/test", (req, res) =>
  res.send({ message: "typescript + express ftw" })
);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
