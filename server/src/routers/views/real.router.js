import { Router } from "express";

const realRouter = Router();

realRouter.get("/", async (req, res, next) => {
  try {
    return res.render("real", {});
  } catch (error) {
    next(error);
  }
});

export default realRouter;
