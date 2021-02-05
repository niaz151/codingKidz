import { Router } from "express";

const secureRouter = Router();

secureRouter.get("/profile", (req, res) => {
  res.json({
    message: "*Hacker Voice* I'm in",
    user: req.user,
    token: req.query.secret_token,
  });
});

export { secureRouter };
