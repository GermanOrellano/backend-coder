import CustomRouter from "../CustomRouter.js";
import dao from "../../data/index.factory.js";
import productsRouter from "./product.router.js";
import sessionRouter from "./session.router.js";
import orderRouter from "./order.router.js";

const { products } = dao;

class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/products", productsRouter);
    this.router.use("/orders", orderRouter);
    this.router.use("/auth", sessionRouter);
    this.read("/", ["USER", "PREM", "ADMIN"], async (req, res, next) => {
      try {
        const orderAndPaginate = {
          limit: req.query.limit || 4,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };

        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }

        if (req.query.sort === "desc") {
          orderAndPaginate.sort.title = "desc";
        }

        const all = await products.read({ filter, orderAndPaginate });
        return res.render("index", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "Mateando E-Commerce",
          filter: req.query.title,
        });
      } catch (error) {
        next(error);
      }
    });
  }
}

const viewsRouter = new ViewsRouter();
export default viewsRouter.getRouter();
