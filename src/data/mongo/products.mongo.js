import MongoManager from "./mongo.manager.js";
import Product from "./models/product.model.js";

const products = new MongoManager(Product);
export default products;
