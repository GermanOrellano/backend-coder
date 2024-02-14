import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 10 },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
const Product = model(collection, schema);

export default Product;
