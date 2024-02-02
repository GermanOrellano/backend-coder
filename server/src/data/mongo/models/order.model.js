import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema(
  {
    uid: { type: Types.ObjectId, required: true, ref: "users" },
    quantity: { type: Number, default: 1 },
    pid: { type: Types.ObjectId, required: true, ref: "products" },
    state: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
    },
  },
  { timestamps: true }
);

const Order = model(collection, schema);

export default Order;
