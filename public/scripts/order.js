const selector = document.querySelectorAll(".deleteButton");

selector.forEach((each) =>
  each.addEventListener("click", async (product) => {
    try {
      const url = "/api/orders/" + product.target.id;
      const opts = {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      };

      let response = await fetch(url, opts);
      response = await response.json();

      if (response.statusCode === 200) {
        Swal.fire({
          title: "Deleted!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  })
);

const selectorBuy = document.querySelector(".btn-buy-finish");

//agregar evento
