import { Router } from "express";
//import product from "../../data/fs/products.fs.js";
import { products } from "../../data/mongo/mongo.manager.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passport from "../../middlewares/passport.mid.js";

const productsRouter = Router();

//solucionar problema isAdmin
productsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res, next) => {
    try {
      const data = req.body;
      const response = await products.create(data);
      if (response === "Title, photo, price and stock are required") {
        return res.json({
          statusCode: 400,
          message: response,
        });
      } else {
        return res.json({
          statusCode: 201,
          message: "Product Created",
        });
      }
    } catch (error) {
      return next(error);
    }
  }
);

productsRouter.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
    };
    let filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    if (req.query.price === "asc") {
      orderAndPaginate.sort.price = 1;
    }
    const all = await products.read({ filter, orderAndPaginate });
    return res.json({
      statusCode: 200,
      message: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const pOne = await products.readOne(pid);
    return res.json({
      statusCode: 200,
      message: pOne,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const uOne = await products.update(pid, data);

    return res.json({
      statusCode: 200,
      response: uOne,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const dOne = await products.destroy(pid);
    return res.json({
      statusCode: 200,
      message: dOne,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
