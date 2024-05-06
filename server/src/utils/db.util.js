import { connect } from "mongoose";
import winstonLog from "./logger/index.js";

export default async () => {
  try {
    await connect(process.env.DB_LINK);
    winstonLog.INFO("Database connected");
  } catch (error) {
    winstonLog.WARN(error.message);
  }
};
