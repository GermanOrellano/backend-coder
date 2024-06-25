import { socketServer } from "../../server.js";
import products from "../data/mongo/products.mongo.js";
import user from "../data/fs/users.fs.js";
import order from "../data/fs/orders.fs.js";
import winstonLog from "./logger/index.js";
import propProducts from "./propProducts.util.js";
import propUsers from "./propUsers.util.js";
import propOrders from "./propOrders.util.js";

export default (socket) => {
  winstonLog.INFO("socket client " + socket.id + "connected");
  socket.emit("products", products.read());
  socket.on("newProduct", async (data) => {
    try {
      propProducts(data);
      await products.create(data);
      socketServer.emit("products", products.read());
    } catch (error) {
      winstonLog.WARN(error.message);
      socketServer.emit("alert", error.message);
    }
  });
};
