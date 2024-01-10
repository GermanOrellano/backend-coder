import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #products = [];

  init() {
    const exist = fs.existsSync(this.path);

    try {
      !exist
        ? fs.writeFileSync(this.path, JSON.stringify([], null, 3))
        : (ProductManager.#products = JSON.parse(
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
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 3)
        );
        console.log("Created product, id: " + product.id);
      }
    } catch (error) {
      throw error.message;
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("There aren't products");
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (one) {
        console.log(one);
        return one;
      } else {
        throw new Error("The id " + id + " wasn't found");
      }
    } catch (error) {
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (one) {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id != id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 3)
        );
      } else {
        throw new Error("The id " + id + " wasn't found");
      }
    } catch (error) {
      return error.message;
    }
  }

  async update(id, data) {
    try {
      const one = ProductManager.#products.readOne(id);
      if (!one) {
        throw new Error("Product not found");
      } else {
        one.title = data.title || one.title;
        one.photo = data.photo || one.photo;
        one.price = data.price || one.price;
        one.stock = data.stock || one.stock;

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 3)
        );
      }
    } catch (error) {
      return error.message;
    }
  }
}

const product = new ProductManager("./src/data/fs/files/products.json");

export default product;
