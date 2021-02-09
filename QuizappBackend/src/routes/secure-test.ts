import { Router } from "express";
import { checkAccess } from "../middleware";

const secureRouter = Router();

secureRouter.post("/profile", checkAccess, (req, res) => {
  res.json({
    message: "*Hacker Voice* I'm in",
    user: req.user,
  });
});

export { secureRouter };
