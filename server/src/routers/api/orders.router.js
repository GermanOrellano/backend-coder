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
    this.read("/", ["USER", "PREM"], read);
    this.update("/:oid", ["USER", "PREM"], update);
    this.destroy("/:oid", ["USER", "PREM"], destroy);
    this.read("/bills/:uid", ["USER", "PREM"], reportBill);
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
