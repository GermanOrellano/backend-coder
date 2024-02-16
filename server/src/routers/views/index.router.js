import { Router } from "express";
//import product from "../../data/fs/products.fs.js";
import { products } from "../../data/mongo/mongo.manager.js";
import realRouter from "./real.router.js";
import registerRouter from "./register.router.js";
import formRouter from "./form.router.js";
import loginRouter from "./login.router.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.read({});
    const allObject = all.docs.map((each) => each.toObject());
    return res.render("index", { products: allObject });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/real", realRouter);
viewsRouter.use("/product", formRouter);
viewsRouter.use("/auth", registerRouter, loginRouter);

export default viewsRouter;
