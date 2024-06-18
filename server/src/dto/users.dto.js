import args from "../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.util.js";

class UserDTO {
  constructor(data) {
    args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.name = data.name;
    this.lastname = data.lastname;
    this.age = data.age || 18;
    this.photo = data.photo || "https://i.postimg.cc/wTgNFWhR/profile.png";
    this.email = data.email;
    this.role = data.role || "USER";
    this.password = createHash(data.password);
    this.verified = data.verified || false;
    this.verifiedCode = crypto.randomBytes(12).toString("base64");
    args.env !== "prod" && (this.updateAt = new Date());
    args.env !== "prod" && (this.createAt = new Date());
  }
}

export default UserDTO;
