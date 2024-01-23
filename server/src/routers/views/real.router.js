import { Router } from "express";
import product from "../../data/fs/products.fs.js";

const realRouter = Router();

realRouter.get("/", async (req, res, next) => {
  try {
    return res.render("real", {});
  } catch (error) {
    next(error);
  }
});

export default realRouter;
