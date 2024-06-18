import service from "../services/orders.service.js";
import pService from "../services/products.service.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";

class OrdersController {
  constructor() {
    this.service = service;
    this.productService = pService;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const { user_id, product_id } = data;
      const pOne = await this.productService.readOne(product_id);
      if (pOne.owner_id.toString() === user_id) {
        return CustomError.new(errors.prodUser);
      } else {
        const response = await this.service.create(data);
        return res.success201(response);
      }
      /* if (response === "User ID, quantity and Product ID are required") {
        return next(error);
      } else {
        return res.success201(response);
      } */
    } catch (error) {
      return next(error);
    }
  };

  reportBill = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const uid = _id.toString();
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
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.user._id) {
        filter.user_id = req.user._id;
      }
      if (req.query.sort === "desc") {
        orderAndPaginate.sort.title = "desc";
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

  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const oOne = await this.service.update(oid, data);
      return res.success200(oOne);
      /* if (oOne) {
      } else {
        CustomError.new(errors.notFound);
      } */
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const dOne = await this.service.destroy(oid);
      return res.success200(dOne);
      /* if (dOne) {
      } else {
        CustomError.new(errors.notFound);
      } */
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersController;
const controller = new OrdersController();
const { create, reportBill, read, update, destroy } = controller;
export { create, reportBill, read, update, destroy };
