import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
  readPremium,
} from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREM"], create);
    this.read("/", ["USER", "ADMIN", "PREM"], read);
    this.read("/:pid", ["USER", "ADMIN", "PREM"], readOne);
    this.read("/premium", ["PREM"], readPremium);
    this.update("/:pid", ["ADMIN", "PREM"], update);
    this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
