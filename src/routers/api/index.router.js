import CustomRouter from "../CustomRouter.js";
import productsRouter from "./products.router.js";
import sessionRouter from "./session.router.js";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";
import winstonLog from "../../utils/logger/index.js";
import paymentsRouter from "./payments.router.js";

class ApiRouter extends CustomRouter {
  init() {
    this.router.use("/users", usersRouter);
    this.router.use("/products", productsRouter);
    this.router.use("/orders", ordersRouter);
    this.router.use("/auth", sessionRouter);
    this.router.use("/payments", paymentsRouter);
    this.router.use("/loggers", async (req, res, next) => {
      try {
        winstonLog.HTTP("LOG HTTP");
        winstonLog.INFO("LOG INFO");
        winstonLog.WARN("LOG WARN");
        winstonLog.ERROR("LOG ERROR");

        return res.json({ response: "WINSTON OK" });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
