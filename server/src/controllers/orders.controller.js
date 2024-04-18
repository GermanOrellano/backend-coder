import service from "../services/orders.service.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";

class OrdersController {
  constructor() {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user_id;
      const response = await this.service.create(data);
      if (response === "User ID, quantity and Product ID are required") {
        return next(error);
      } else {
        return res.success201(response);
      }
    } catch (error) {
      return next(error);
    }
  };

  reportBill = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = this.service.reportBill(uid);
      return res.success200(report);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const orderAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
      };
      const filter = {};
      if (req.user_id) {
        filter.user_id = req.user_id;
      }
      if (req.query.sort === "desc") {
        orderAndPaginate.sort.title = "desc";
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

  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const oOne = await this.service.update(oid, data);
      if (oOne) {
        return res.success200(oOne);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const dOne = await this.service.destroy(oid);
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

export default OrdersController;
const controller = new OrdersController();
const { create, reportBill, read, update, destroy } = controller;
export { create, reportBill, read, update, destroy };
