/* import winstonLog from "../../src/utils/logger/index.js"; */

const selector = document.querySelector("#register");

selector.addEventListener("click", async () => {
  try {
    const data = {
      name: document.querySelector("#register-name").value,
      lastname: document.querySelector("#register-lastname").value,
      photo: document.querySelector("#register-photo").value,
      email: document.querySelector("#register-email").value,
      password: document.querySelector("#register-password").value,
    };

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    let response = await fetch("/api/auth/register", opts);
    response = await response.json();

    if (response.statusCode === 201) {
      Swal.fire({
        title: "Register!",
        text: response.message,
        icon: "success",
      }).then(() => {
        location.replace("/auth/verify");
      });
    } else {
      Swal.fire({
        title: "Oops...",
        text: response.message,
        icon: "error",
      });
    }
  } catch (error) {
    winstonLog.WARN(error.message);
  }
});
