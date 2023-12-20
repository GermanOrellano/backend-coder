class UserManager {
  static #users = [];

  constructor() {}

  create(dataUser) {
    try {
      if (!dataUser.name || !dataUser.photo || !dataUser.email) {
        throw new Error("Name, photo and email are required");
      } else {
        const user = {
          id:
            UserManager.#users.length === 0
              ? 1
              : UserManager.#users[UserManager.#users.length - 1].id + 1,
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
        console.log(UserManager.#users.find((each) => each.id === Number(n)));
      }
    } catch (error) {
      return console.log(error.message);
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
