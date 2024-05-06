import CustomRouter from "../CustomRouter.js";
import {
  create,
  reportBill,
  read,
  update,
  destroy,
} from "../../controllers/orders.controller.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM"], create);
    this.read("/bills/:uid", ["ADMIN"], reportBill);
    this.read("/", ["USER", "PREM"], read);
    this.update("/:oid", ["USER", "PREM"], update);
    this.destroy("/:oid", ["USER", "PREM"], destroy);
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
