import express from "express";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import morgan from "morgan";

const server = express();
const PORT = 8080;
const ready = () => {
  console.log(`Express server listening on port: ${PORT}`);
};
server.listen(PORT, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
