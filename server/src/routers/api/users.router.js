import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  readOne,
  readByEmail,
  update,
  destroy,
} from "../../controllers/users.controller.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["ADMIN"], read);
    this.read("/:uid", ["USER", "PREM"], readOne);
    this.read("/", ["USER", "PREM"], readByEmail);
    this.update("/:uid", ["USER", "PREM"], update);
    this.destroy("/:uid", ["USER", "PREM"], destroy);
  }
}
