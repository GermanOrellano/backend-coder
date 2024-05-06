import CustomRouter from "../CustomRouter.js";
import {
  register,
  login,
  signout,
  verifyAccount,
} from "../../controllers/session.controller.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import passport from "../../middlewares/passport.mid.js";

class SessionRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passCallBack("register"), register);
    this.create("/login", ["PUBLIC"], passCallBack("login"), login);
    this.create(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    /* this.read("/google/cb"); */
    this.create("/github");
    /* this.read("/github/cb"); */
    this.create(
      "/signout",
      ["USER", "ADMIN", "PREM"],
      passCallBack("jwt"),
      signout
    );
    this.create("/verify", ["PUBLIC"], verifyAccount);
    /* this.read("/signout/cb");
    this.read("/badauth"); */
  }
}

const sessionRouter = new SessionRouter();
export default sessionRouter.getRouter();
