import jwt from "jsonwebtoken";
import CustomError from "./errors/CustomError.util.js";
import errors from "./errors/errors.js";
import env from "./env.util.js";

const createToken = (data) =>
  jwt.sign(data, env.SECRET, { expiresIn: 60 * 60 * 24 });

const verifyToken = (headers) => {
  const token = headers.token;
  if (token) {
    const data = jwt.verify(token, env.SECRET);
    return data;
  } else {
    throw CustomError.new(errors.badAuth);
  }
};

export { createToken, verifyToken };
