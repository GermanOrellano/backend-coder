function errorHandler(error, res, req, next) {
  return res.json({
    statusCode: error.statusCode || 500,
    message: `${req.method} ${req.url} ${error.message}`,
  });
}

export default errorHandler;
