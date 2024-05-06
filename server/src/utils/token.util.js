import jwt from "jsonwebtoken";
import CustomError from "./errors/CustomError.util.js";
import errors from "./errors/errors.js";

function createToken(data) {
  const token = jwt.sign(data, process.env.SECRET, {
    expiresIn: 60,
  });
  return token;
}

function verifyToken(token) {
  if (token) {
    const data = jwt.verify(token, process.env.SECRET);
    return data;
  } else {
    CustomError.new(errors.badAuth);
  }
}

export { createToken, verifyToken };
