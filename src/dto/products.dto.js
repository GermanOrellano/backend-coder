import args from "../utils/args.util.js";
import crypto from "crypto";

class ProductDTO {
  constructor(data) {
    args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex")),
      (this.title = data.title),
      (this.photo = data.photo),
      (this.price = data.price),
      (this.stock = data.stock),
      (this.oid = data.uid),
      (this.date = data.date || new Date());
    args.env !== "prod" && (this.updateAt = new Date()),
      args.env !== "prod" && (this.createAt = new Date());
  }
}

export default ProductDTO;
