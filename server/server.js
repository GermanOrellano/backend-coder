import env from "./src/utils/env.util.js";

import express from "express";
/* import { createServer } from "http";
import { Server } from "socket.io"; */
import morgan from "morgan";
import { engine } from "express-handlebars";
//import socketUtils from "./src/utils/socket.utils.js";
import dbUtil from "./src/utils/db.util.js";
import compression from "express-compression";
import cluster from "cluster";
import { cpus } from "os";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import cors from "cors";
import winston from "./src/middlewares/winston.mid.js";
import winstonLog from "./src/utils/logger/index.js";
import options from "./src/utils/swagger.js";

//server
const server = express();
const PORT = env.PORT || 8080;
const ready = () => {
  winstonLog.INFO(`Express server listening on port: ${PORT}`);
  dbUtil();
};
const sp = swaggerJSDoc(options);
/* const httpServer = createServer(server);
const socketServer = new Server(httpServer);
socketServer.on("connection", socketUtils); */

const specs = swaggerJSDoc(options);

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", `${__dirname} + "/src/views`);

const FileStore = sessionFileStore(expressSession);
//middlewares

//MEMORY STORE
/* server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
); */

//FILE STORE
/* server.use(
    expressSession({
      secret: process.env.SECRET_KEY,
      resave: true,
      saveUninitialized: true,
      store: new FileStore({
        path: "./src/data/fs/files/sessions",
        ttl: 10,
        retries: 3,
      }),
    })
  ); */

//MONGO STORE
/* server.use(
    expressSession({
        secret: process.env.SECRET_KEY,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
          ttl: 7 * 24 * 60 * 60,
          mongoUrl: process.env.DB_LINK,
        }),
      })
    ); */
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);
server.use("/api/docs", serve, setup(sp));
server.use(cookieParser(env.SECRET_KEY));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));
server.use(winston);
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
server.use("/api/docs", serve, setup(specs));

//routers
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

//clusters
if (cluster.isPrimary) {
  winstonLog.INFO("Primary ID:" + process.pid);
  const cpu = cpus().length;
  winstonLog.INFO("CPUS: " + cpu);
  cluster.fork();
} else {
  winstonLog.INFO("Worker ID:" + process.pid);
  server.listen(PORT, ready);
}

//export { socketServer };
