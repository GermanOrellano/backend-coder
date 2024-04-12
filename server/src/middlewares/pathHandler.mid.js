export default (req, res, next) => {
  return res.json({
    statusCode: 404,
    url: `${req.method} ${req.url}`,
    message: "not found endpoint",
  });
};
