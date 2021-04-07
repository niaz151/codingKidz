import { Router } from "express";
import { body, param } from "express-validator";

import { Role } from "@prisma/client";
import { AuthMiddleware, ErrorMiddleware, UserMiddleware } from "../middleware";
import { AuthController, QuestionController, UserController } from "../controllers";

import multer from "multer";
import { UserValidator } from "../validators";



const userRouter = Router();

userRouter.route("/").all(AuthMiddleware.hasValidAccessToken);

userRouter.post(
  "/:id/profile/avatar",
  param("id").custom(UserValidator.isValidUserID),
  UserMiddleware.upload.single("avatar"),
  ErrorMiddleware.checkForValidationErrors,
  UserController.uploadAvatar
);

export default userRouter;
