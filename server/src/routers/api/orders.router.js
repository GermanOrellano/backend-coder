import { Router } from "express";
import order from "../../data/fs/orders.fs.js";

const ordersRouter = Router();

ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await order.create(data);
    if (response === "User ID, quantity and Product ID are required") {
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

ordersRouter.get("/", async (req, res, next) => {
  try {
    const all = await order.read();
    return res.json({
      statusCode: 200,
      message: all,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const oOne = await order.readOne(uid);
    return res.json({
      statusCode: 200,
      message: oOne,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/oid:", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const dOne = await order.destroy(oid);
    return res.json({
      statusCode: 200,
      message: dOne,
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;
