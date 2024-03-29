import apiRouter from "./api/index.router.js";
import viewsRouter from "./views/index.router.js";
import CustomRouter from "./CustomRouter.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("api", apiRouter);
    this.use("/", viewsRouter);
  }
}

const router = new IndexRouter();
export default router.getRouter();
