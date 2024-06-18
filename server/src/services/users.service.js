import repository from "../repositories/users.rep.js";
import sendEmail from "../utils/sendEmail.util.js";
import recoveryEmail from "../utils/recoveryEmail.util.js";
//agregar recoveryEmail

class UsersService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => await this.repository.create(data);

  read = async ({ filter, orderAndPaginate }) =>
    await this.repository.read({ filter, orderAndPaginate });
  readOne = async (uid) => await this.repository.readOne(uid);
  readByEmail = async (email) => await this.repository.readByEmail(email);
  update = async (uid, data) => await this.repository.update(uid, data);
  destroy = async (uid) => await this.repository.destroy(uid);
  register = async (data) => {
    try {
      await sendEmail(data);
    } catch (error) {
      throw error;
    }
  };
  recovery = async (data, token) => {
    try {
      await recoveryEmail(data, token);
    } catch (error) {
      throw error;
    }
  };
}

const service = new UsersService();
export default service;
