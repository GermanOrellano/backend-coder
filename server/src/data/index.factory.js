import args from "../utils/args.util.js";
import "dotenv/config.js";

const environment = args.env;

let dao = {};

switch (environment) {
  case "test":
    console.log("FS CONNECTED");
    const { default: productsFs } = await import("./fs/products.fs.js");
    const { default: usersFs } = await import("./fs/users.fs.js");
    const { default: ordersFs } = await import("./fs/orders.fs.js");
    dao = {
      products: productsFs,
      users: usersFs,
      orders: ordersFs,
    };
    break;

  case "dev":
    console.log("MONGO CONNECTED");
    const { default: productsMongoDev } = await import(
      "./mongo/products.mongo.js"
    );
    const { default: usersMongoDev } = await import("./mongo/users.mongo.js");
    const { default: ordersMongoDev } = await import("./mongo/orders.mongo.js");
    dao = {
      products: productsMongoDev,
      users: usersMongoDev,
      orders: ordersMongoDev,
    };
    break;

  default:
    console.log("MONGO CONNECTED");
    const { default: productsMongo } = await import(
      "./mongo/products.mongo.js"
    );
    const { default: usersMongo } = await import("./mongo/users.mongo.js");
    const { default: ordersMongo } = await import("./mongo/orders.mongo.js");
    dao = { products: productsMongo, users: usersMongo, orders: ordersMongo };
    break;
}

export default dao;
