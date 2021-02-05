import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/index";

const authRouter = Router();

authRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res) => {
    if (req.user) {
      const token = jwt.sign({ user: req.user }, JWT_SECRET);

      res.json({
        message: "Signup Successful",
        token: token,
      });
    } else {
      res.json({ message: "An error occured" });
    }
  }
);

authRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async function (err, user) {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, JWT_SECRET);

        return res.json({
          message: "Login Successful",
          token: token,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export { authRouter };
