import crypto from "crypto";

class ProductManager {
  static #products = [];

  constructor() {}

  create(dataProduct) {
    try {
      if (
        !dataProduct.title ||
        !dataProduct.photo ||
        !dataProduct.price ||
        !dataProduct.stock
      ) {
        throw new Error("Title, photo, price and stock are required");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: dataProduct.title,
          photo: dataProduct.photo,
          price: dataProduct.price,
          stock: dataProduct.stock,
        };
        ProductManager.#products.push(product);
      }
    } catch (error) {
      return console.log(error.message);
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("There aren't users");
      } else {
        return console.log(ProductManager.#products);
      }
    } catch (error) {
      return console.log(error.message);
    }
  }

  readOne(n) {
    try {
      if (n > ProductManager.#products.length) {
        throw new Error("The ID entered doesn't exist");
      } else {
        console.log(ProductManager.#products.find((each) => each.id === n));
      }
    } catch (error) {
      return console.log(error.message);
    }
  }

  destroy(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (one) {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id != id
        );
        console.log("Destroyed ID: " + id);
      } else {
        throw new Error("The id " + id + " wasn't found");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  update(id, data) {
    try {
      const one = ProductManager.#products.readOne(id);
      if (!one) {
        throw new Error("Product not found");
      } else {
        one.title = data.title || one.title;
        one.photo = data.photo || one.photo;
        one.price = data.price || one.price;
        one.stock = data.stock || one.stock;
      }
    } catch (error) {
      return error.message;
    }
  }
}

const newProduct = new ProductManager();

newProduct.create({
  title: "Yerba Mate",
  photo: "foto de yerba",
  price: 1000,
  stock: 5,
});

newProduct.create({
  title: "Azúcar",
  photo: "foto de azucar",
  price: 2800,
  stock: 3,
});

newProduct.read();
newProduct.readOne(5);
newProduct.destroy("57d904ef0e95fa157f397f596");
