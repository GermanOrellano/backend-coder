import { Router } from "express";
//import product from "../../data/fs/products.fs.js";
import { products } from "../../data/mongo/mongo.manager.js";
import { registerRouter } from "./session.router.js";
import { loginRouter } from "./session.router.js";
import formRouter from "./form.router.js";
import orderRouter from "./order.router.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 4,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    };

    let filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }

    if (req.query.sort === "asc") {
      options.sort.title = "asc";
    }

    const all = await products.read({ filter, options });
    //const allObject = all.docs.map((each) => each.toObject());
    return res.render("index", {
      products: all.docs.map((each) => each.toObject()),
      next: all.nextPage,
      prev: all.prevPage,
      title: "INDEX",
      filter: req.query.title,
    });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/product", formRouter);
viewsRouter.use("/orders", orderRouter);
viewsRouter.use("/auth", registerRouter, loginRouter);

export default viewsRouter;
