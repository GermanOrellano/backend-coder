import "dotenv/config.js";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import socketUtils from "./src/utils/socket.utils.js";
import dbConnection from "./src/utils/db.js";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";

//server
const server = express();
const PORT = 8080;
const ready = () => {
  console.log(`Express server listening on port: ${PORT}`);
  dbConnection();
};
const httpServer = createServer(server);
const socketServer = new Server(httpServer);

httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

//routers
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };