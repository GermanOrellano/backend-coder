import CustomRouter from "../CustomRouter.js";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";
import sessionRouter from "./session.router.js";

export default class ApiRouter extends CustomRouter {
  init() {
    this.router.use("/users", usersRouter);
    this.router.use("/products", productsRouter);
    this.router.use("/orders", ordersRouter);
    this.router.use("/auth", sessionRouter);
  }
}
