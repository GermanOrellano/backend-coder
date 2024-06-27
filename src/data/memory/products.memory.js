import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class ProductManager {
  static #products = [];

  constructor() {}
  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Title, photo, price and stock are required");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };
        ProductManager.#products.push(product);
        return product;
      }
    } catch (error) {
      throw error;
    }
  }

  read(obj) {
    try {
      if (ProductManager.#products.length === 0) {
        const error = new Error("There is nothing to read");
        error.statusCode = 404;
        throw error;
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
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
      ProductManager.#products = ProductManager.#products.filter(
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

const product = new ProductManager();
export default product;
