const btnEntrar = document.getElementById("btn-entrar");
const userInput = document.getElementById("id-login");
const rol = document.getElementById("check-rol")
const form = document.querySelector('form');


btnEntrar.addEventListener('click',getPage);
userInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        getPage()
    }
})
form.addEventListener('submit', (event) => {
    event.preventDefault()
  })
  

function getPage(){

    const username = userInput.value.trim();
      
    if (username === "") {
      alert('Por favor ingrese su usuario');
      return;
    }

    if (!isValidEmail(username)) {
        alert('No es un email valido');
        return;
    }

    var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };



      fetch(`http://127.0.0.1:3000/users/check-email?email=${username}`, requestOptions)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'verify user!'
            })
          }
        })
        .then(result => {
          // If alumno
          if (rol.checked && result.rol === 'student') {
            window.location.href ="./pages/carga-video.html"
          } else if(!rol.checked && result.rol === 'teacher') {
            window.location.href ="./pages/inicio-docente.html"
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'verify rol!'
            })
            
          }
        })
        .catch(error => console.log('error', error));
}


