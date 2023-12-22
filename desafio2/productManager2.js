const fs = require("fs");

class ProductManager2 {
  static #products = [];

  constructor() {}

  create(dataProduct) {
    const route = "./desafio2/data/products.json";
    const product = {
      id:
        ProductManager2.#products.length === 0
          ? 1
          : ProductManager2.#products[ProductManager2.#products.length - 1].id +
            1,
      title: dataProduct.title,
      photo: dataProduct.photo,
      price: dataProduct.price,
      stock: dataProduct.stock,
    };

    ProductManager2.#products.push(product);
    let content = JSON.stringify(ProductManager2.#products, null, 3);

    fs.writeFileSync(route, content);
  }

  read() {
    const route = "./desafio2/data/products.json";

    fs.promises
      .readFile(route, "utf-8")
      .then((resultado) => console.log(JSON.parse(resultado)))
      .catch((error) => console.log(error));
  }
  readOne(n) {
    const route = "./desafio2/data/products.json";

    //falta lógica
  }
}

const newProduct = new ProductManager2();

newProduct.create({
  title: "Yerba Mate",
  photo: "foto de yerba",
  price: 1000,
  stock: 5,
});

newProduct.create({
  title: "Azúcar",
  photo: "foto de azúcar",
  price: 2500,
  stock: 3,
});

newProduct.create({
  title: "Edulcorante",
  photo: "foto de edulcorante",
  price: 2800,
  stock: 10,
});

newProduct.read();
newProduct.readOne(1);
