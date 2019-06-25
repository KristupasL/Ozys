function registerUser() {

  let uName = document.getElementById('userName').value
  let email = document.getElementById('email').value
  let pass = document.getElementById('password').value
  let rpass = document.getElementById('rePassword').value
  // let photo = document.getElementById('photo').value
  // let description = document.getElementById('description').value


  if (pass != rpass) {
    alert("Passwords do not match")
    return
  }

  (async () => {
    const rawResponse = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: uName,
        email: email,
        password: pass
      })
    });

    const content = await rawResponse.json();

    if (content._id) {
      location.replace("http://localhost:8080/login.html")
    } else {
      alert(content)
    }
  })();
}

document.getElementById('register').addEventListener('click', () => registerUser());

document.getElementById('login').addEventListener('click', () => {
  location.replace("http://localhost:8080/login.html")
})
