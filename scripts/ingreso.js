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


    if (rol.checked) {
      window.location.href ="./pages/carga-video.html";
    }else {
      window.location.href ="./pages/inicio-docente.html";
    }
}

