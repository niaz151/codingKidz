import { Router } from "express";
import { checkAccessToken } from "../middleware";

const secureRouter = Router();

secureRouter.post("/profile", checkAccessToken, (req, res) => {
  res.json({
    message: "*Hacker Voice* I'm in",
    user: req.user,
  });
});

export { secureRouter };
