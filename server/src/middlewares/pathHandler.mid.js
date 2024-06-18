import winstonLog from "../utils/logger/index.js";

const pathHandler = (req, res, next) => {
  const response = `${req.method} ${req.url} not found endpoint`;
  winstonLog.WARN(response);
  return res.json(response);
};

export default pathHandler;
