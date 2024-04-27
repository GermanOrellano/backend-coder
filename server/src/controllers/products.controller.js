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
      const response = await this.service.create(data);
      winstonLog.INFO(data);
      if (response === "Title, photo, price and stock are required") {
        //revisar error
        CustomError.new(errors.error);
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
        limit: req.query.limit || 5,
        page: req.query.page || 1,
      };
      const filter = {};
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
      if (req.query.price === "asc") {
        orderAndPaginate.sort.price = 1;
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
      const { pid } = req.params;
      const pOne = await this.service.readOne(pid);
      if (pOne) {
        return res.success200(pOne);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const uOne = await this.service.update(pid, data);
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
      const { pid } = req.params;
      const dOne = await this.service.destroy(pid);
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

export default ProductsController;
const controller = new ProductsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
