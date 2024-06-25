import CustomRouter from "../CustomRouter.js";

class SessionRouter extends CustomRouter {
  init() {
    this.read(
      "/register",
      ["USER", "PREM", "ADMIN"],
      async (req, res, next) => {
        try {
          return res.render("register", { title: "REGISTER" });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/login", ["ADMIN", "PREM", "USER"], async (req, res, next) => {
      try {
        return res.render("login", { title: "LOGIN" });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/verify", ["ADMIN", "PREM", "USER"], async (req, res, next) => {
      try {
        return res.render("verify", { title: "VERIFY" });
      } catch (error) {
        return next(error);
      }
    });
  }
}
const sessionRouter = new SessionRouter();
export default sessionRouter.getRouter();
