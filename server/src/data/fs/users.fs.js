import fs from "fs";
import crypto from "crypto";

class UserManager {
  static #users = [];

  init() {
    const exist = fs.existsSync(this.path);

    try {
      !exist
        ? fs.writeFileSync(this.path, JSON.stringify([], null, 3))
        : (UserManager.#users = JSON.parse(
            fs.readFileSync(this.path, "utf-8")
          ));
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

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
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 3)
        );
        console.log("Created user, id: " + user.id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("There aren't users");
      } else {
        console.log(UserManager.#users);
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (one) {
        console.log(one);
        return one;
      } else {
        throw new Error("The id " + id + " wasn't found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (one) {
        UserManager.#users = UserManager.#users.filter((each) => each.id != id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 3)
        );
        console.log("Destroyed ID: " + id);
      } else {
        throw new Error("The id " + id + " wasn't found");
      }
    } catch (error) {
      return error.message;
    }
  }

  async update(id, data) {
    try {
      const one = UserManager.#users.readOne(id);
      if (!one) {
        throw new Error("User not found");
      } else {
        one.name = data.name || one.name;
        one.photo = data.photo || one.photo;
        one.email = data.email || one.email;

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 3)
        );
      }
    } catch (error) {
      return error.message;
    }
  }
}

const user = new UserManager("./src/data/fs/files/users.json");

export default user;
