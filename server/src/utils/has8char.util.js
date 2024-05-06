import CustomError from "./errors/CustomError.util.js";
import errors from "./errors/errors.js";

function has8char(password) {
  if (password.lenght < 8) {
    CustomError.new(errors.message("Password must have a least 8 characters"));
  }
}

export default has8char;
