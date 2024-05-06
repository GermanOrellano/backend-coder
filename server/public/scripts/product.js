const selector = document.querySelector("#new-product");

selector.addEventListener("click", async () => {
  try {
    const data = {
      title: document.querySelector("#title").value,
      photo: document.querySelector("#photo").value,
      price: document.querySelector("#price").value,
      stock: document.querySelector("#stock").value,
    };

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    let response = await fetch("/api/products", opts);
    response = await response.json();
    if (response.statusCode === 201) {
      Swal.fire({
        title: "New Product!",
        text: response.message,
        icon: "success",
      });
    } else {
      const error = new Error("It was not possible to create the product");
      error.statusCode = 401;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  } catch (error) {
    alert(error.message);
  }
});
