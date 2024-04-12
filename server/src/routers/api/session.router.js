import CustomRouter from "../CustomRouter.js";
import {
  register,
  login,
  signout,
  verifyAccount,
} from "../../controllers/session.controller.js";

class SessionRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], register);
    this.create("/login", ["PUBLIC"], login);
    /* this.create("/google");
    this.read("/google/cb");
    this.create("/github");
    this.read("/github/cb"); */
    this.create("/signout", ["USER", "ADMIN", "PREM"], signout);
    /* this.read("/signout/cb");
    this.read("/badauth"); */
  }
}

const sessionRouter = new SessionRouter();
export default sessionRouter.getRouter();
