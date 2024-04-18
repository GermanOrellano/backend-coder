import CustomRouter from "../CustomRouter.js";
import productsRouter from "./products.router.js";
import sessionRouter from "./session.router.js";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";
//import passCallbackMid from "../../middlewares/passCallback.mid.js";

class ApiRouter extends CustomRouter {
  init() {
    this.router.use("/users", usersRouter);
    this.router.use("/products", productsRouter);
    this.router.use("/orders", ordersRouter);
    this.router.use("/auth", sessionRouter);
  }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
