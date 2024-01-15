import { Router } from "express";
import apiRouter from "./api/index.router.js";
import viewsRouter from "./views/index.router.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/view", viewsRouter);

export default router;
