import { Router } from "express";
import { authRouter } from "./auth";
import { topicRouter } from "./topic";
import { unitRouter } from "./unit";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/unit", unitRouter);
router.use("/api/topic", topicRouter);

export { router };
