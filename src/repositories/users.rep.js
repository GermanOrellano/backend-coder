import UserDTO from "../dto/users.dto.js";
import dao from "../data/index.factory.js";

const { users } = dao;

class UsersRep {
  constructor() {
    this.model = users;
  }
  create = async (data) => {
    data = new UserDTO(data);
    const response = await this.model.create(data);
    return response;
  };
  read = async ({ filter, orderAndPaginate }) =>
    await this.model.read({ filter, orderAndPaginate });
  readOne = async (uid) => await this.model.readOne(uid);
  readByEmail = async (email) => await this.model.readByEmail(email);
  update = async (uid, data) => await this.model.update(uid, data);
  destroy = async (uid) => await this.model.destroy(uid);
}

const repository = new UsersRep();
export default repository;
