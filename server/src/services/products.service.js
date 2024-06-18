import repository from "../repositories/products.rep.js";
import ProductDTO from "../dto/products.dto.js";

class ProductsService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => await this.repository.create(data);
  read = async ({ filter, orderAndPaginate }) =>
    await this.repository.read(filter, orderAndPaginate);
  readOne = async (pid) => await this.repository.readOne(pid);
  update = async (pid, data) => await this.repository.update(pid, data);
  destroy = async (pid) => await this.repository.destroy(pid);
}

const service = new ProductsService();
export default service;
