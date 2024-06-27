import CustomRouter from "../CustomRouter.js";
import dao from "../../data/index.factory.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

const { products, users } = dao;

class ProductsRouter extends CustomRouter {
  init() {
    this.read(
      "/real",
      ["ADMIN, PREM"],
      passCallBack("jwt"),
      isAdmin,
      (req, res, next) => {
        try {
          return res.render("real", { title: "REAL" });
        } catch (error) {
          next(error);
        }
      }
    );

    this.read(
      "/form",
      ["ADMIN", "PREM"],
      passCallBack("jwt"),
      isAdmin,
      (req, res, next) => {
        try {
          return res.render("form", { title: "CREATE" });
        } catch (error) {
          next(error);
        }
      }
    );

    this.read("/:pid", ["USER", "ADMIN", "PREM"], async (req, res, next) => {
      try {
        const user = await users.readByEmail(req.user.email);
        const { pid } = req.params;
        const one = await products.readOne(pid);
        return res.render("productDetail", {
          product: one,
          title: one.title.toUpperCase(),
          user: user._id,
        });
      } catch (error) {
        next(error);
      }
    });
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
