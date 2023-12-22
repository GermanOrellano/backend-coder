const fs = require("fs");

class UserManager2 {
  static #users = [];

  constructor() {}

  create(dataUser) {
    const route = "./desafio2/data/users.json";
    const user = {
      id:
        UserManager2.#users.length === 0
          ? 1
          : UserManager2.#users[UserManager2.#users.length - 1].id + 1,
      name: dataUser.name,
      photo: dataUser.photo,
      email: dataUser.email,
    };
    UserManager2.#users.push(user);
    let content = JSON.stringify(UserManager2.#users, null, 3);

    fs.writeFileSync(route, content);
  }

  read() {
    const route = "./desafio2/data/users.json";

    fs.promises
      .readFile(route, "utf-8")
      .then((resultado) => console.log(JSON.parse(resultado)))
      .catch((error) => console.log(error));
  }
  readOne(n) {
    const route = "./desafio2/data/users.json";

    //falta lógica
  }
}

const newUser = new UserManager2();

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
