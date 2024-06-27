const socket = io();

socket.on("products", (data) => {
  const template = data
    .map(
      (each) => `
      <div class="card-container">
        <div class="card" style="width: 18rem;">
          <img src="${each.photo}" class="card-img-top" alt="${each.title}">
          <div class="card-body">
            <h5 class="card-title">${each.title}</h5>
            <p class="card-text">${each.price}</p>
            <p class="card-text">${each.stock}</p>
            <button type="button" class="btn btn-primary">Buuuuy</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
  document.querySelector("#products").innerHTML = template;
});
