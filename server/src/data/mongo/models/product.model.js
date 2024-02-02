import { model, Schema } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 10 },
  },
  { timestamps: true }
);

const Product = model(collection, schema);

export default Product;
