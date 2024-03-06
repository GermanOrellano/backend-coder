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
<<<<<<< HEAD
=======
<<<<<<< HEAD
    console.log(response.message);
=======
>>>>>>> 2dcb6f6ca03e0d8cc24b30e134b29606aad30a1f
>>>>>>> e6e6f5c2cb19d37c0c0bba8bec028e86cf3b8db3
=======
    console.log(response.message);
>>>>>>> sprint7.2

    Swal.fire({
      title: "Login!",
      text: response.message,
      icon: "success",
    });

<<<<<<< HEAD
<<<<<<< HEAD
    response.session && location.replace("/");
=======
<<<<<<< HEAD
    response.token && location.replace("/");
=======
    response.session && location.replace("/");
>>>>>>> 2dcb6f6ca03e0d8cc24b30e134b29606aad30a1f
>>>>>>> e6e6f5c2cb19d37c0c0bba8bec028e86cf3b8db3
=======
    response.token && location.replace("/");
>>>>>>> sprint7.2
    //revisar catch
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
