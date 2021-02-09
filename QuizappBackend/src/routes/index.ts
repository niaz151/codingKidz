import { Router } from "express";
import { authRouter } from "./auth";
import { secureRouter } from "./secure-test";

const router = Router();

router.use("/api", authRouter);
router.use("/api", secureRouter);

export { router };
