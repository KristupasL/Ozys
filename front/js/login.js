function loginUser() {
  let uName = document.getElementById("userName").value;
  let pass = document.getElementById("password").value;

  fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: uName,
        password: pass
      })
    })
    .then(res => {
      localStorage.setItem('website-x-auth-token', res.headers.get('x-auth'))
      return res.json()
    })
    .then(data => {
      location.replace("http://localhost:8080/index.html")
    })
    .catch((err) => {
      console.log(err)
    })

}
document.getElementById('login').addEventListener('click', () => loginUser());

document.getElementById('register').addEventListener('click', () => {
  location.replace("http://localhost:8080/register.html");
})