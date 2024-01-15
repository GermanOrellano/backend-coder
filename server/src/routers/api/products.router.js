import { Router } from "express";
import product from "../../data/fs/products.fs.js";

const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await product.create(data);
    if (response === "Title, photo, price and stock are required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await product.read();
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
    const pOne = await product.readOne(pid);
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
    const uOne = await product.update(pid, data);

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
    const dOne = await product.destroy(pid);
    return res.json({
      statusCode: 200,
      message: dOne,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
