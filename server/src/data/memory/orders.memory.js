import crypto from "crypto";

class OrdersManager {
  static #orders = [];

  constructor() {}

  create(dataOrders) {
    try {
      if (!dataOrders.uid || !dataOrders.quantity || !dataOrders.pid) {
        throw new Error("User ID, quantity and Product ID are required");
      } else {
        const order = {
          id: crypto.randomBytes(12).toString("hex"),
          uid: dataOrders.uid,
          quantity: dataOrders.quantity,
          pid: dataOrders.pid,
          state: "reserved",
        };

        OrdersManager.#orders.push(order);
      }
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if (OrdersManager.#orders.length === 0) {
        throw new Error("There aren't orders");
      } else {
        return console.log(OrdersManager.#orders);
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(uid) {
    try {
      const one = OrdersManager.#orders.find((each) => each.id === uid);
      if (one) {
        return one;
      } else {
        throw new Error("The ID entered doesn't exist");
      }
    } catch (error) {
      return error.message;
    }
  }

  destroy(oid) {
    try {
      const one = OrdersManager.#orders.find((each) => each.id === oid);

      if (!one) {
        throw new Error("The id " + oid + " wasn't found");
      } else {
        OrdersManager.#orders = OrdersManager.#orders.filter(
          (each) => each.id != oid
        );
        console.log("Destroyed ID: " + oid);
      }
    } catch (error) {
      return error.message;
    }
  }

  update(oid, quantity, state) {
    try {
      const one = OrdersManager.#orders.find((each) => each.id === oid);

      if (!one) {
        throw new Error("The id " + oid + " wasn't found");
      } else {
        one.quantity = quantity || one.quantity;
        one.state = state || one.state;
      }
    } catch (error) {
      return error.message;
    }
  }
}

const order = new OrdersManager();
