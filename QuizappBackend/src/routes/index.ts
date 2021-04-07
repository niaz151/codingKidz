import { Router } from "express";
import authRouter from "./auth.routes";
import unitRouter from "./unit.routes";
import userRouter from "./user.route";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/user/", userRouter);
router.use("/api/unit", unitRouter);

export { router };
