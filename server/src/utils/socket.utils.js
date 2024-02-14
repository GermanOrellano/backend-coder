import { socketServer } from "../../server.js";
//import product from "../data/fs/products.fs.js";
import { products } from "../data/mongo/mongo.manager.js";

export default (socket) => {
  console.log("socket client " + socket.id + "connected");
  socket.emit("products", products.read({}));
  socket.on("newProduct", async (data) => {
    try {
      await products.create(data);
      socketServer.emit("products", products.read({}));
    } catch (error) {
      console.log(error);
    }
  });
};
