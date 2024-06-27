import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class OrdersManager {
  static #orders = [];
  constructor() {}

  async create(data) {
    try {
      if (!data.uid || !data.quantity || !data.pid) {
        throw new Error("User ID, quantity and Product ID are required");
      } else {
        const order = {
          id: crypto.randomBytes(12).toString("hex"),
          uid: data.uid,
          quantity: data.quantity,
          pid: data.pid,
          state: "reserved",
        };
        OrdersManager.#orders.push(order);
        return order;
      }
    } catch (error) {
      throw error;
    }
  }

  read(obj) {
    try {
      if (OrdersManager.#orders.length === 0) {
        const error = new Error("There is nothing to read");
        error.statusCode = 404;
        throw error;
      } else {
        return OrdersManager.#orders;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = OrdersManager.#orders.find((each) => each.id === id);
      if (!one) {
        const error = new Error("The ID entered doesn't exist");
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      OrdersManager.#orders = OrdersManager.#orders.filter(
        (each) => each.id != id
      );
      return one;
    } catch (error) {
      throw error;
    }
  }

  update(id, data) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
    } catch (error) {
      throw error;
    }
  }
}

const order = new OrdersManager();
export default order;
