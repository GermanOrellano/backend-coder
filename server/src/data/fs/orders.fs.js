import crypto from "crypto";
import fs from "fs";

class OrdersManager {
  static #orders = [];

  init() {
    const exist = fs.existsSync(this.path);

    try {
      !exist
        ? fs.writeFileSync(this.path, JSON.stringify([], null, 3))
        : (OrdersManager.#orders = JSON.parse(
            fs.readFileSync(this.path, "utf-8")
          ));
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(dataOrders) {
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
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrdersManager.#orders, null, 3)
        );
        console.log("Created order, id: " + order.id);
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
        return OrdersManager.#orders;
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

  async destroy(oid) {
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

  async update(oid, quantity, state) {
    try {
      const one = OrdersManager.readOne(oid);
      if (!one) {
        throw new Error("The id " + oid + " wasn't found");
      } else {
        one.quantity = quantity || one.quantity;
        one.state = state || one.state;

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrdersManager.#orders, null, 3)
        );
      }
    } catch (error) {
      return error.message;
    }
  }
}

const order = new OrdersManager("./src/data/fs/files/orders.json");

export default order;
