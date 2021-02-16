import { Router } from "express";
import { authRouter } from "./auth";
import { unitRouter } from "./unit";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/unit", unitRouter);

export { router };
