import { orders } from "../data/mongo/mongo.manager.js";

class OrdersService {
  constructor() {
    this.model = orders;
  }

  create = async (data) => {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  reportBill = async (uid) => {
    try {
      const response = await this.model.reportBill(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, orderAngPaginate }) => {
    try {
      const response = await this.model.read({ filter, orderAngPaginate });
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (oid, data) => {
    try {
      const response = await this.model.update(oid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (oid) => {
    try {
      const response = await this.model.destroy(oid);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new OrdersService();
export default service;
