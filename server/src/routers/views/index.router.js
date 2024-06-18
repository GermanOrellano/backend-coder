import CustomRouter from "../CustomRouter.js";
//import product from "../../data/fs/products.fs.js";
import dao from "../../data/index.factory.js";
import productsRouter from "./product.router.js";
import sessionRouter from "./session.router.js";
import orderRouter from "./order.router.js";

const { products } = dao;

class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/product", productsRouter);
    this.router.use("/orders", orderRouter);
    this.router.use("/auth", sessionRouter);
    this.read("/", ["USER", "PREM", "ADMIN"], async (req, res, next) => {
      try {
        const options = {
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
          options.sort.title = "desc";
        }

        const all = await products.read({ filter, options });
        //const allObject = all.docs.map((each) => each.toObject());
        return res.render("index", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "INDEX",
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
