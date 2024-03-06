import { Router } from "express";
import { orders, users } from "../../data/mongo/mongo.manager.js";

const orderRouter = Router();

orderRouter.get("/", async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    };

    const user = await users.readByEmail(req.user.email);
    const filter = {
      user_id: user._id,
    };

    const all = await orders.read({ filter, options });
    return res.render("order", { title: "CART", orders: all.docs });
  } catch (error) {
    return res.render("order", { title: "CART", message: "No Orders" });
  }
});

export default orderRouter;
