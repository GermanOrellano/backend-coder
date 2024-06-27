/* import winstonLog from "../../src/utils/logger/index.js"; */

fetch("/api/auth/me", { method: "POST" })
  .then((res) => res.json())
  .then((res) => {
    if (res.statusCode === 200) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#register-button"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#login-button"));
      document
        .querySelector("#signout-button")
        .addEventListener("click", async () => {
          try {
            const token = localStorage.getItem("token");
            let options = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            };
            let response = await fetch("/api/auth/signout", options);
            response = await response.json();
            if (response.statusCode === 200) {
              Swal.fire({
                title: "Bye!",
                icon: "success",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.removeItem("token");
                  location.replace("/");
                }
              });
            }
          } catch (error) {
            winstonLog.WARN(error.message);
          }
        });
    } else {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#form-button"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#signout-button"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#order-button"));
    }

    if (res.response?.role === "USER") {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#form-button"));
    } else if (res.response?.role === "ADMIN") {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#order-button"));
    }
  });
