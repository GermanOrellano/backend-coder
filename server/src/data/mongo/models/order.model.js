import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "orders";
const schema = new Schema(
  {

    uid: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
      index: true,
    },

    pid: {
      type: Types.ObjectId,
      required: true,
      ref: "products",
      index: true,
    },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

schema.pre("find", function () {
  this.populate("uid", "email photo");
});
schema.pre("find", function () {
  this.populate("pid");
});
schema.pre("findOne", function () {
  this.populate("uid", "email photo");
});
schema.pre("findOne", function () {
  this.populate("pid");
});

const Order = model(collection, schema);
export default Order;
