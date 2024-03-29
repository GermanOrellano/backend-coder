import CustomRouter from "../CustomRouter.js";
import ProductsRouter from "./products.router.js";
import sessionRouter from "./session.router.js";
import UsersRouter from "./users.router.js";
import OrdersRouter from "./orders.router.js";
import passCallbackMid from "../../middlewares/passCallback.mid.js";

const product = new ProductsRouter();
const user = new UsersRouter();
const order = new OrdersRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", user.getRouter());
    this.use("/products", product.getRouter());
    this.use("/orders", passCallbackMid("jwt"), order.getRouter());
    this.use("/auth", sessionRouter);
  }
}
