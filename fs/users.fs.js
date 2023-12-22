const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  static #users = [];

  init() {
    const exist = fs.existsSync(this.path);

    !exist
      ? fs.writeFileSync(this.path, JSON.stringify([], null, 3))
      : (UserManager.#users = JSON.parse(fs.readFileSync(this.path, "utf-8")));
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
}

const user = new UserManager("./fs/files/users.json");

user.create({
  name: "Germán",
  photo: "foto de Germán",
  email: "german@mail.com",
});

user.create({
  name: "Federico",
  photo: "foto de Federico",
  email: "federico@mail.com",
});

user.read();
user.readOne("2c4c8380525d4425b83a0e83");
