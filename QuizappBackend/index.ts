import express from "express";

const app = express();
const PORT = process.env.PORT;
app.get("/api/test", (req, res) => res.send({ message: "typescript + express" }));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
