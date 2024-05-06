import service from "../services/users.service.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";

class UsersController {
  constructor() {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      if (response === "Name, photo and email are required") {
        return next(error);
      } else {
        return res.success201(response);
      }
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
      if (req.query.sort === "asc") {
        orderAndPaginate.sort.email = 1;
      }
      const all = await this.service.read({ filter, orderAndPaginate });
      if (all.docs.length > 0) {
        return res.success200(all);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await this.service.readOne(uid);
      if (one) {
        return res.success200(one);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  readByEmail = async (req, res, next) => {
    try {
      const { email } = req.params;
      const one = await this.service.readByEmail(email);
      if (one) {
        return res.success200(one);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const uOne = await this.service.update(uid, data);
      if (uOne) {
        return res.success200(uOne);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const dOne = await this.service.destroy(uid);
      if (dOne) {
        return res.success200(dOne);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, readByEmail, update, destroy } = controller;
export { create, read, readOne, readByEmail, update, destroy };
