import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (password) => hashSync(password, genSaltSync(10));

const verifyHash = (req, db) => {
  const verify = compareSync(req, db);
  return verify;
};

export { createHash, verifyHash };
