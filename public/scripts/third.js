const google = document.querySelector("#google");

google.addEventListener("click", async () => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
    };
    let response = await fetch("/api/auth/google", options);
    response = await response.json();
    //corregir
    location.replace("/api/auth/google");
  } catch (error) {
    alert(error.message);
  }
});

const github = document.querySelector("#github");

github.addEventListener("click", async () => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
    };
    let response = await fetch("/api/auth/github", options);
    response = await response.json();
    location.replace("/api/auth/github");
  } catch (error) {
    alert(error.message);
  }
});
