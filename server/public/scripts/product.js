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

    let response = await fetch("/product/form", opts);
    response = await response.json();

    Swal.fire({
      title: "New Product!",
      text: response.message,
      icon: "success",
    });

    response.message === "Product Created" && location.replace("/");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
