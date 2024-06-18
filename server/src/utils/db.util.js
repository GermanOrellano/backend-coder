import { connect } from "mongoose";
import winstonLog from "./logger/index.js";
import env from "./env.util.js";

const db = async () => {
  try {
    await connect(env.DB_LINK);
    winstonLog.INFO("Database connected");
  } catch (error) {
    winstonLog.ERROR(error);
  }
};

export default db;
