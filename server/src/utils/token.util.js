import jwt from "jsonwebtoken";

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
  }
  const error = new Error("Bad auth token");
  error.statusCode = 401;
  throw error;
}

export { createToken, verifyToken };
