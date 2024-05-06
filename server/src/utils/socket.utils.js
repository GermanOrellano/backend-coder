import { socketServer } from "../../server.js";
//import product from "../data/fs/products.fs.js";
import products from "../data/mongo/products.mongo.js";
import winstonLog from "./logger/index.js";

export default (socket) => {
  winstonLog.INFO("socket client " + socket.id + "connected");
  socket.emit("products", products.read({}));
  socket.on("newProduct", async (data) => {
    try {
      await products.create(data);
      socketServer.emit("products", products.read({}));
    } catch (error) {
      winstonLog.WARN(error.message);
    }
  });
};
