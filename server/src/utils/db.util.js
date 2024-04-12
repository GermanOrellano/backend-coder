import { connect } from "mongoose";

export default async () => {
  try {
    await connect(process.env.DB_LINK);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
