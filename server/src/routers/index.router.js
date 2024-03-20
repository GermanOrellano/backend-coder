import ApiRouter from "./api/index.router.js";
import ViewsRouter from "./views/index.router.js";
import CustomRouter from "./CustomRouter.js";

const api = new ApiRouter();
const views = new ViewsRouter();

export default class IndexRouter extends CustomRouter {
  init() {
    this.router.use("api", api.getRouter());
    this.router.use("/", views.getRouter());
  }
}
