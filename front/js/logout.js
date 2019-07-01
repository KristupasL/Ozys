document.getElementById('logout').addEventListener('click', function() {
  fetch('http://localhost:3000/api/logout', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': token
      }
    })
    .then(res => {
      location.replace('http://localhost:8080/login.html')
      localStorage.clear();
    })
    .catch((err) => {
      console.log(err);
    })
})
