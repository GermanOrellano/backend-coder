import CustomRouter from "../CustomRouter.js";
import dao from "../../data/index.factory.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

const { orders, users } = dao;

class OrderRouter extends CustomRouter {
  init() {
    this.read(
      "/",
      ["ADMIN", "PREM", "USER"],
      passCallBack("jwt"),
      async (req, res, next) => {
        try {
          const orderAndPaginate = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            sort: { title: 1 },
            lean: true,
          };
          const user = await users.readByEmail(req.user.email);
          const filter = {
            user_id: user._id,
          };
          const all = await orders.read({ filter, orderAndPaginate });
          return res.render("orders", { title: "CART", orders: all.docs });
        } catch (error) {
          return res.render("orders", {
            title: "CART",
            message: "No orders",
          });
        }
      }
    );
  }
}

const orderRouter = new OrderRouter();
export default orderRouter.getRouter();
