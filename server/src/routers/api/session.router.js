import CustomRouter from "../CustomRouter.js";
import {
  register,
  login,
  signout,
  verifyAccount,
  me,
  recovery,
} from "../../controllers/session.controller.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import passport from "../../middlewares/passport.mid.js";

class SessionRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["USER", "ADMIN", "PREM"],
      passCallBack("register"),
      register
    );
    this.create(
      "/login",
      ["USER", "ADMIN", "PREM"],
      passCallBack("login"),
      login
    );
    this.create(
      "/google",
      ["USER", "ADMIN", "PREM"],
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
    this.create("/verify", ["USER", "ADMIN", "PREM"], verifyAccount);
    this.create("/me", ["USER", "ADMIN", "PREM"], me);
    this.create("/recovery", ["USER", "ADMIN", "PREM"], recovery);
  }
}

let sessionRouter = new SessionRouter();
export default sessionRouter.getRouter();
