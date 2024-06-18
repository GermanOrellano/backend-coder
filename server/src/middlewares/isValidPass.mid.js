/* import { users } from "../data/mongo/mongo.manager.js";
import isValidPassUtils from "../utils/isValidPass.util.js";

function isValidPass(req, res, next) {
  try {
    const { email, password } = req.body;
    const one = users.readByEmail(email);
    const dbPassword = one.password;
    isValidPassUtils(password, dbPassword);
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidPass;
 */