import crypto from "crypto";

class UserManager {
  static #users = [];

  constructor() {}

  create(dataUser) {
    try {
      if (!dataUser.name || !dataUser.photo || !dataUser.email) {
        throw new Error("Name, photo and email are required");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: dataUser.name,
          photo: dataUser.photo,
          email: dataUser.email,
        };
        UserManager.#users.push(user);
      }
    } catch (error) {
      return console.log(error.message);
    }
  }

  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("There aren't users");
      } else {
        return console.log(UserManager.#users);
      }
    } catch (error) {
      return console.log(error.message);
    }
  }

  readOne(n) {
    try {
      if (n > UserManager.#users.length) {
        throw new Error("The ID entered doesn't exist");
      } else {
        console.log(UserManager.#users.find((each) => each.id === n));
      }
    } catch (error) {
      return console.log(error.message);
    }
  }

  destroy(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (one) {
        UserManager.#users = UserManager.#users.filter((each) => each.id != id);
        console.log("Destroyed ID: " + id);
      } else {
        throw new Error("The id " + id + " wasn't found");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  update(id, data) {
    try {
      const one = UserManager.#users.readOne(id);
      if (!one) {
        throw new Error("User not found");
      } else {
        one.name = data.name || one.name;
        one.photo = data.photo || one.photo;
        one.email = data.email || one.email;
      }
    } catch (error) {
      return error.message;
    }
  }
}

const newUser = new UserManager();

newUser.create({
  name: "German",
  photo: "Foto de usuario",
  email: "german@mail.com",
});

newUser.create({
  name: "Federico",
  photo: "Foto de usuario",
  email: "federico@mail.com",
});

newUser.create({
  name: "Antonella",
  photo: "Foto de usuario",
  email: "antonella@mail.com",
});

newUser.read();
newUser.readOne(5);
newUser.destroy();
