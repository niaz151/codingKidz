import { Router } from "express";
import { authRouter } from "./auth.routes";
import { unitRouter } from "./unit.routes";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/unit", unitRouter);

export { router };
