import CustomRouter from "../CustomRouter.js";
import productsRouter from "./products.router.js";
import sessionRouter from "./session.router.js";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";
import passCallbackMid from "../../middlewares/passCallback.mid.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/orders", passCallbackMid("jwt"), ordersRouter);
    this.use("/auth", sessionRouter);
  }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
