import { Router } from "express";
import product from "../../data/fs/products.fs.js";

const formRouter = Router();

formRouter.get("/", async (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});

export default formRouter;
