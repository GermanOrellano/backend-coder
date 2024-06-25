const selector = document.querySelector("#verify");

selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#verify-email").value,
      verifiedCode: document.querySelector("#verify-code").value,
    };

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    let response = await fetch("/api/auth/verify", opts);
    response = await response.json();

    if (response.statusCode === 200) {
      Swal.fire({
        title: "Verified!",
        text: response.message,
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          location.replace("/auth/login");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.message,
      });
    }
  } catch (error) {}
});
