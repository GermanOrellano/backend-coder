fetch("/api/auth/", { method: "POST" })
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
              localStorage.removeItem("token");
              location.replace("/");
            }
          } catch (error) {
            console.log(error);
          }
        });
    } else {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#form-button"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#signout-button"));
    }
  });
