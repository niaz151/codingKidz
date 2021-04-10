import { Router } from "express";
import { body, param } from "express-validator";

import { AuthMiddleware, ErrorMiddleware, UserMiddleware } from "../middleware";
import { UserController } from "../controllers";

import { UserValidator } from "../validators";



const userRouter = Router();

userRouter.route("/").all(AuthMiddleware.hasValidAccessToken);

userRouter.get(
  "/:userId/profile",
  param("userId").custom(UserValidator.isValidUserID),
  ErrorMiddleware.checkForValidationErrors,
  UserController.getProfile
);

userRouter.post(
  "/:userId/profile/avatar",
  param("userId").custom(UserValidator.isValidUserID),
  ErrorMiddleware.checkForValidationErrors,
  UserMiddleware.upload.single("avatar"),
  UserController.uploadAvatar
);

export default userRouter;
