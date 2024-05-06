import OrderDTO from "../dto/orders.dto.js";
import dao from "../data/index.factory.js";

const { orders } = dao;

class OrdersRep {
  constructor() {
    this.model = orders;
  }

  create = async (data) => {
    date = new OrderDTO(data);
    const response = await this.model.create(data);
    return response;
  };
  reportBill = async (uid) => await this.model.reportBill(uid);
  read = async ({ filter, orderAndPaginate }) =>
    await this.model.read({ filter, orderAndPaginate });
  readOne = async (uid) => await this.model.readOne(uid);
  update = async (oid, data) => await this.model.update(oid, data);
  destroy = async (oid) => await this.model.destroy(oid);
}

const repository = new OrdersRep();
export default repository;
