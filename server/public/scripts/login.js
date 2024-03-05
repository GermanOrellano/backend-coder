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
    console.log(response.message);

    Swal.fire({
      title: "Login!",
      text: response.message,
      icon: "success",
    });

    response.token && location.replace("/");
    //revisar catch
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
