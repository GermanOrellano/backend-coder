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

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> sprint7.2
    let response = await fetch("/api/products", opts);
    response = await response.json();
    console.log(response);
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
<<<<<<< HEAD
=======
>>>>>>> e6e6f5c2cb19d37c0c0bba8bec028e86cf3b8db3
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
<<<<<<< HEAD
=======
>>>>>>> 2dcb6f6ca03e0d8cc24b30e134b29606aad30a1f
>>>>>>> e6e6f5c2cb19d37c0c0bba8bec028e86cf3b8db3
=======
>>>>>>> sprint7.2
  }
});
