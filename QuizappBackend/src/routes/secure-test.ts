import { Router } from "express";
import { hasValidAccessToken } from "../middleware";

const secureRouter = Router();

secureRouter.post("/profile", hasValidAccessToken, (req, res) => {
  res.json({
    message: "*Hacker Voice* I'm in",
    user: req.user,
  });
});

export { secureRouter };
