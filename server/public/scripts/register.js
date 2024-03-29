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

    if (response.message === "Registered") {
      Swal.fire({
        title: "Register!",
        text: response.message,
        icon: "success",
      });
      location.replace("/auth/login");
    } else {
      Swal.fire({
        title: "Oops...",
        text: response.message,
        icon: "error",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
