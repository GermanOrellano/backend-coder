import repository from "../repositories/orders.rep.js";

class OrdersService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => {
    try {
      const response = await this.repository.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  reportBill = async (uid) => {
    try {
      const response = await this.repository.reportBill(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, orderAngPaginate }) => {
    try {
      const response = await this.repository.read({ filter, orderAngPaginate });
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (oid, data) => {
    try {
      const response = await this.repository.update(oid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (oid) => {
    try {
      const response = await this.repository.destroy(oid);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new OrdersService();
export default service;
