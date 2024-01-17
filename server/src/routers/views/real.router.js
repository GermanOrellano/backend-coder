import { Router } from "express";
import product from "../../data/fs/products.fs.js";

const realRouter = Router();

realRouter.get("/", async (req, res, next) => {
  try {
    const all = await product.read();
    return res.render("real", { products: all });
  } catch (error) {
    next(error);
  }
});

export default realRouter;
