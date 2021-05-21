import { Router } from "express";
import authRouter from "./auth.routes";
import languageRouter from "./language.routes";
import userRouter from "./user.route";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/user/", userRouter);
router.use("/api/language", languageRouter);

export { router };
