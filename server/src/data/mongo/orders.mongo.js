import MongoManager from "./mongo.manager.js";
import Order from "./models/order.model.js";

const orders = new MongoManager(Order);
export default orders;
