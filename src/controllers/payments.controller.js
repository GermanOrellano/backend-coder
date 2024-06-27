import service from "../services/payments.service.js";

class PaymentsController {
  constructor() {
    this.service = service;
  }

  checkout = async (req, res, next) => {
    try {
      const filter = {};
      const orderAndPaginate = {
        limit: req.query.limit || 4,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const { _id } = req.user;
      if (_id) {

        filter.uid = _id;
      }
      const response = await this.service.checkout({
        filter,
        orderAndPaginate,
      });
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default PaymentsController;
const controller = new PaymentsController();
const { checkout } = controller;
export { checkout };
