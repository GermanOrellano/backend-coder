import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, default: 18 },
    photo: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    role: { type: Number, default: 0 },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
const User = model(collection, schema);

export default User;
