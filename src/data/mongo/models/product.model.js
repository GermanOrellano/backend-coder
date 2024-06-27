import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: { type: String },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 10 },
    oid: { type: Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Product = model(collection, schema);
export default Product;
