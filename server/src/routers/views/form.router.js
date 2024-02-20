import { Router } from "express";

const formRouter = Router();

formRouter.get("/form", async (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});

export default formRouter;
