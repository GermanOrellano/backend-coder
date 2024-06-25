const selector = document.querySelector(".buy");
const user = document.getElementById("userId").value;
const increaseButtons = document.querySelectorAll(".increase");
const decreaseButtons = document.querySelectorAll(".decrease");
const quantityInput = document.getElementById("quantity");

selector.addEventListener("click", async (product) => {
  try {
    const data = { uid: user, pid: product.target.id };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    let response = await fetch("/api/orders", opts);
    response = await response.json();

    if (response.statusCode === 401) {
      Swal.fire({
        icon: "error",
        title: "¡Log in!",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      location.replace("/orders");
    }
  } catch (error) {
    alert(error.message);
  }
});

increaseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let currentQuantity = parseInt(quantityInput.value);
    const maxQuantity = parseInt(quantityInput.max);
    if (currentQuantity < maxQuantity) {
      quantityInput.value = currentQuantity + 1;
    }
  });
});

decreaseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
      quantityInput.value = currentQuantity - 1;
    }
  });
});
