const selector = document.querySelector(".deleteButton");

selector.forEach((each) =>
  each.addEventListener("click", async (e) => {
    try {
      const url = "/api/orders/" + e.target.id;
      const opts = {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      };

      let response = await fetch(url, opts);
      response = await response.json();

      if (response === 200) {
        alert(response.message);
        location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  })
);
