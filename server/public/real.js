/* const socket = io();

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
            <a href="#" class="btn btn-primary">Buy</a>
          </div>
        </div>
      </div>
    `
    )
    .join("");
  document.querySelector("#product").innerHTML = template;
});

document.querySelector("#new-product").addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const photo = document.querySelector("#photo").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;

  const data = {};

  title && (data.title = title);
  photo && (data.photo = photo);
  price && (data.price = price);
  stock && (data.stock = stock);

  console.log(data);
  socket.emit("newProduct", data);
});
 */
