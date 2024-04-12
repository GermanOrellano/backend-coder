import args from "../utils/args.util.js";
import crypto from "crypto";

class UserDTO {
  constructor(data) {
    args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex")),
      (this.name = data.name),
      (this.photo = data.photo),
      (this.email = data.email),
      args.env !== "prod" && (this.updateAt = new Date()),
      args.env !== "prod" && (this.createAt = new Date());
  }
}

export default UserDTO;
