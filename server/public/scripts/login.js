import winstonLog from "../../src/utils/logger/index.js";

const selector = document.querySelector("#login");

selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#login-email").value,
      password: document.querySelector("#login-password").value,
    };

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    let response = await fetch("/api/auth/login", opts);
    response = await response.json();

    if (response.statusCode === 200) {
      //localStorage.setItem("token", response.token);
      Swal.fire({
        title: "Login!",
        text: response.message,
        icon: "success",
      });
      //location.replace("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.message,
      });
    }
  } catch (error) {
    winstonLog.WARN(error.message);
  }
});
