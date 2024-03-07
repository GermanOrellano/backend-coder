import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "orders";
const schema = new Schema(
  {
    uid: { type: Types.ObjectId, required: true, ref: "users" },
    pid: { type: Types.ObjectId, required: true, ref: "products" },
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
  this.populate("uid", "name lastname");
});
schema.pre("find", function () {
  this.populate("pid", "title price");
});
schema.pre("findOne", function () {
  this.populate("uid", "name lastname");
});
schema.pre("findOne", function () {
  this.populate("pid", "title price");
});

const Order = model(collection, schema);
export default Order;
