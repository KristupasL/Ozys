function login() {
  console.log();
  let email = document.getElementById("loginEmail").value; // id vėliau pakeisti
  let pass = document.getElementById("loginPassword").value; // id vėliau pakeisti

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: pass
    })
  })
    .then(res => {
      localStorage.setItem("website-x-auth-token", res.headers.get("x-auth"));
      return res.json();
    })
    .then(data => {
      location.replace("http://localhost:8080/index.html");
    })
    .catch(err => {
      console.log(err);
    });
}
