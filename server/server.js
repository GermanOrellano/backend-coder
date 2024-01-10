import express from "express";
import router from "./src/routers/index.router.js";

const server = express();

const PORT = 8080;
const ready = () => {
  console.log(`Express server listening on port: ${PORT}`);
};

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", router);

server.listen(PORT, ready);
