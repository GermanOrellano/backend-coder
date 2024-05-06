import ProductDTO from "../dto/products.dto.js";
import dao from "../data/index.factory.js";

const { products } = dao;

class ProductsRep {
  constructor() {
    this.model = products;
  }

  create = async (data) => {
    data = new ProductDTO(data);
    const response = await this.model.create(data);
    return response;
  };
  read = async ({ filter, orderAndPaginate }) =>
    await this.model.read({ filter, orderAndPaginate });
  readOne = async (pid) => await this.model.readOne(pid);
  update = async (pid, data) => await this.model.update(pid, data);
  destroy = async (id) => await this.model.destroy(id);
}

const repository = new ProductsRep();
export default repository;
