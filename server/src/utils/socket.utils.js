import { socketServer } from "../../server.js";
import product from "../data/fs/products.fs.js";

export default (socket) => {
  console.log("socket client " + socket.id + "connected");
  socket.emit("products", product.read());
  socket.on("newProduct", async (data) => {
    try {
      await product.create(data);
      socketServer.emit("products", product.read());
    } catch (error) {
      console.log(error);
    }
  });
};
