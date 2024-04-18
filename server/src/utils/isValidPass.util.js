import CustomError from "./errors/CustomError.util.js";
import errors from "./errors/errors.js";

function isValidPass(formPassword, dbPassword) {
  if (formPassword !== dbPassword) {
    CustomError.new(errors.invalidCred);
  }
}

export default isValidPass;
