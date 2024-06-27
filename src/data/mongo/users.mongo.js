import MongoManager from "./mongo.manager.js";
import User from "./models/user.model.js";

const users = new MongoManager(User);
export default users;
