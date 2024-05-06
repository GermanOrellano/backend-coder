import winston from "./winston.mid.js";

function errorHandler(error, req, res, next) {
  winston.ERROR(error.message);
  return res.json({
    statusCode: error.statusCode || 500,
    message: `${req.method} ${req.url} ${error.message}`,
  });
}

export default errorHandler;
