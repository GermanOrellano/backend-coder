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
<<<<<<< HEAD
    console.log(response.message);
=======
>>>>>>> 2dcb6f6ca03e0d8cc24b30e134b29606aad30a1f

    Swal.fire({
      title: "Login!",
      text: response.message,
      icon: "success",
    });

<<<<<<< HEAD
    response.token && location.replace("/");
=======
    response.session && location.replace("/");
>>>>>>> 2dcb6f6ca03e0d8cc24b30e134b29606aad30a1f
    //revisar catch
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
