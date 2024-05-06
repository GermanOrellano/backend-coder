import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class UserManager {
  static #users = [];

  constructor() {}
  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, photo and email are required");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        UserManager.#users.push(user);
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  read(obj) {
    try {
      if (UserManager.#users.length === 0) {
        const error = new Error("There is nothing to read");
        error.statusCode = 404;
        throw error;
      } else {
        return UserManager.#users;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
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
      UserManager.#users = UserManager.#users.filter((each) => each.id != id);
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

const user = new UserManager();
export default user;
