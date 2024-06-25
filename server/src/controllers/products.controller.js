import service from "../services/products.service.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";
import winstonLog from "../utils/logger/index.js";

class ProductsController {
  constructor() {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.uid = req.uid;
      const response = await this.service.create(data);
      winstonLog.INFO(data);
      return res.success201(response);
      /* if (response === "Title, photo, price and stock are required") {
        //revisar error
        CustomError.new(errors.error);
      } else {
      } */
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const orderAndPaginate = {
        limit: req.query.limit || 5,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
      if (req.query.sort === "desc") {
        orderAndPaginate.sort.title = "desc";
      }
      if (req.user && req.user.role === "PREM") {
        filter.oid = { $ne: req.user._id };
      }
      const all = await this.service.read({ filter, orderAndPaginate });
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await this.service.readOne(pid);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const { _id } = req.user;
      const uid = _id.toString();
      const data = req.body;

      if (req.user.role === "PREM") {
        const one = await this.service.readOne(pid);
        const oid = one.oid.toString();
        if (oid !== uid) {
          return CustomError.new(errors.forbidden);
        }
      }
      const response = await this.service.update(pid, data);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const { _id } = req.user;
      const uid = _id.toString();
      if (req.user.role === "PREM") {
        const one = await this.service.readOne(pid);
        const oid = one.oid.toString();
        if (oid === uid) {
          const response = await this.service.destroy(pid);
          return res.success200(response);
        } else {
          return CustomError.new(errors.notFound);
        }
      } else {
        const response = await this.service.destroy(pid);
        return res.success200(response);
      }
    } catch (error) {
      return next(error);
    }
  };

  readPremium = async (req, res, next) => {
    try {
      const orderAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
      if (req.query.sort === "desc") {
        orderAndPaginate.sort.title = "desc";
      }
      if (req.user && req.user.role === "PREM") {
        filter.oid = { $eq: req.user._id };
      }
      const all = await this.service.read({ filter, orderAndPaginate });
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsController;
const controller = new ProductsController();
const { create, read, readOne, update, destroy, readPremium } = controller;
export { create, read, readOne, update, destroy, readPremium };
