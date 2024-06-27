import repository from "../repositories/orders.rep.js";

class OrdersService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => await this.repository.create(data);
  reportBill = async (uid) => await this.repository.reportBill(uid);
  read = async ({ filter, orderAngPaginate }) =>
    await this.repository.read({ filter, orderAngPaginate });
  readOne = async (oid) => await this.repository.readOne(oid);
  update = async (oid, data) => await this.repository.update(oid, data);
  destroy = async (oid) => await this.repository.destroy(oid);
}

const service = new OrdersService();
export default service;
