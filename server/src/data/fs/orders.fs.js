import fs from "fs";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class OrdersManager {
  init() {
    const exist = fs.existsSync(this.path);
    try {
      !exist
        ? fs.writeFileSync(this.path, JSON.stringify([], null, 3))
        : (this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8")));
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    this.orders = [];
    this.init();
  }

  async create(data) {
    try {
      if (!data.uid || !data.quantity || !data.pid) {
        throw new Error("User ID, quantity and Product ID are required");
      } else {
        this.orders.push(data);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.orders, null, 3)
        );
        return data;
      }
    } catch (error) {
      throw error;
    }
  }

  read(obj) {
    try {
      if (this.orders.length === 0) {
        const error = new Error("There is nothing to read");
        error.statusCode = 404;
        throw error;
      } else {
        return this.orders;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = this.orders.find((each) => each._id === id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      this.orders = this.orders.filter((each) => each._id != id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.orders, null, 3)
      );
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.orders, null, 3)
      );
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const order = new OrdersManager("./src/data/fs/files/orders.json");
export default order;
