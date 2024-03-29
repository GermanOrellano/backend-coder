import CustomRouter from "../CustomRouter.js";
import passCallbackMid from "../../middlewares/passCallback.mid.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controller.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREM"], passCallbackMid("jwt"), create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN", "PREM"], update);
    this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
  }
}
