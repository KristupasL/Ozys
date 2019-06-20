function registerUser() {
  let userName = document.getElementById('registerUserName').value
  let email = document.getElementById('registerEmail').value
  let pass = document.getElementById('registerPassword').value
  let rpass = document.getElementById('registerPassword').value
  let photo = document.getElementById('registerPassword').value
  let description = document.getElementById('registerDescription').value


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
        userName: userName,
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
  });
}
