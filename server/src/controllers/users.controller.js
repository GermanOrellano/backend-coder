import service from "../services/users.service.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { verifyToken } from "../utils/token.util.js";

class UsersController {
  constructor() {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const orderAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { email: 1 },
        lean: true,
      };
      const filter = {};
      if (req.query.email) {
        filter.email = new RegExp(req.query.email.trim(), "i");
      }
      if (req.query.sort === "desc") {
        orderAndPaginate.sort.email = "desc";
      }
      const all = await this.service.read({ filter, orderAndPaginate });
      return res.success200(all);
      /* if (all.docs.length > 0) {
      } else {
        CustomError.new(errors.notFound);
      } */
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await this.service.readOne(uid);
      return res.success200(one);
      /* if (one) {
      } else {
        CustomError.new(errors.notFound);
      } */
    } catch (error) {
      return next(error);
    }
  };

  readByEmail = async (req, res, next) => {
    try {
      const { email } = req.params;
      const one = await this.service.readByEmail(email);
      return res.success200(one);
      /* if (one) {
      } else {
        CustomError.new(errors.notFound);
      } */
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const { password } = data;
      const uOne = await this.service.update(uid, data);
      if (!uOne) {
        CustomError.new(errors.notFound);
      } else {
        if (password) {
          const verify = verifyHash(password, uOne.password);
          if (verify) {
            CustomError.new(errors.exist);
          } else {
            const newPass = createHash(password);
            const response = await this.service.update(uid, {
              password: newPass,
            });
            return res.success201(response);
          }
        } else {
          return res.success200(uOne);
        }
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const dOne = await this.service.destroy(uid);
      return res.success200(dOne);
      /* if (dOne) {
      } else {
        CustomError.new(errors.notFound);
      } */
    } catch (error) {
      return next(error);
    }
  };

  verify = async (req, res, next) => {
    try {
      const uToken = verifyToken(req.params);
      if (uToken) {
        return res.success200({
          response: "Verified",
          user_id: uToken.user_id,
        });
      } else {
        return CustomError(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  updateRole = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await this.service.readByEmail(uid);
      const newRole = one.role === "PREM" ? "USER" : "PREM";
      const response = await this.service.update(uid, { role: newRole });
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersController;
const controller = new UsersController();
const {
  create,
  read,
  readOne,
  readByEmail,
  update,
  destroy,
  verify,
  updateRole,
} = controller;
export {
  create,
  read,
  readOne,
  readByEmail,
  update,
  destroy,
  verify,
  updateRole,
};
