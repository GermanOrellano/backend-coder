import args from "../utils/args.util.js";
import crypto from "crypto";

class OrderDTO {
  constructor(data) {
    args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex")),
      (this.uid = data.uid),
      (this.quantity = data.quantity),
      (this.pid = data.pid),
      (this.state = "reserved"),
      args.env !== "prod" && (this.updateAt = new Date()),
      args.env !== "prod" && (this.createAt = new Date());
  }
}

export default OrderDTO;
