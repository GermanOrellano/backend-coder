import fs from "fs";
import notFoundOne from "../../utils/errors/CustomError.util.js";

class UserManager {
  init() {
    const exist = fs.existsSync(this.path);
    try {
      !exist
        ? fs.writeFileSync(this.path, JSON.stringify([], null, 3))
        : (this.users = JSON.parse(fs.readFileSync(this.path, "utf-8")));
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }

  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, photo and email are required");
      } else {
        this.users.push(data);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.users, null, 3)
        );
        return data;
      }
    } catch (error) {
      throw error;
    }
  }

  read(obj) {
    try {
      if (this.users.length === 0) {
        const error = new Error("There is nothing to read");
        error.statusCode = 404;
        throw error;
      } else {
        return this.users;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = this.users.find((each) => each._id === id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      this.users = this.users.filter((each) => each._id != id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, 3)
      );
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, 3)
      );
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const user = new UserManager("./src/data/fs/files/users.json");
export default user;
