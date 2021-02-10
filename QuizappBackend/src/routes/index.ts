import { Router } from "express";
import { authRouter } from "./auth";
import { secureRouter } from "./secure-test";
import { unitRouter } from "./unit";

const router = Router();

router.use("/api", authRouter);
router.use("/api", secureRouter);
router.use("/api", unitRouter);

export { router };
