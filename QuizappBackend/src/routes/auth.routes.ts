import { Router } from "express";
import { body } from "express-validator";

import { Role } from "@prisma/client";
import { AuthMiddleware, ErrorMiddleware } from "../middleware";
import { AuthController } from "../controllers";

const authRouter = Router();

authRouter.post(
  "/signup",
  body("email").isEmail().normalizeEmail(),
  body("password"),
  body("role").isIn(Object.values(Role)),
  ErrorMiddleware.checkForValidationErrors,
  AuthController.signUp
);

authRouter.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password"),
  ErrorMiddleware.checkForValidationErrors,
  AuthController.logIn
);

authRouter.get(
  "/refreshAccessToken",
  AuthMiddleware.hasValidRefreshToken,
  AuthController.refreshAccessToken
);

authRouter.get(
  "/refreshRefreshToken",
  AuthMiddleware.hasValidRefreshToken,
  AuthController.refreshRefreshToken
);

authRouter.get(
  "/users",
  AuthMiddleware.hasValidAccessToken,
  AuthMiddleware.hasRoles(["ADMIN", "TEACHER"]),
  AuthController.listUsers
);

export { authRouter };
