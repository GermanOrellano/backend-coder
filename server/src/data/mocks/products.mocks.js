import { faker } from "@faker-js/faker";
import repository from "../../repositories/products.rep.js";
import "dotenv/config.js";
import dbUtil from "../../utils/db.util.js";

function productsMock() {
  return {
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    photo:
      "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
    stock: 15,
  };
}

async function createMocks() {
  try {
    const data = productsMock();
    dbUtil();
    await repository.create(data);
    console.log("PRODUCT CREATED");
  } catch (error) {
    console.log(error);
  }
}

createMocks();
