const btnCargar = document.getElementById("btn-cargar");
btnCargar.addEventListener('click', loadYouTubeVideo,);
const btnGuardar = document.getElementById("btn-guardar");
btnGuardar.addEventListener('click', saveProject,);
const firstNameInput = document.getElementById("info__first_name");
const lastNameInput = document.getElementById("info__last_name");
const emailInput = document.getElementById("info__email");
const titleInput = document.getElementById("info__title");
const descriptionInput = document.getElementById("info__description");
const linkInput = document.getElementById("project-info__link");
const video = document.getElementById("project-video");

function loadYouTubeVideo(){
    // https://www.youtube.com/watch?v=OWKXEJN67FE
    // https://www.youtube.com/embed/9N9opF-PK5k
    // https://www.youtube.com/watch?v=9N9opF-PK5k
   const url= linkInput.value;
   video.setAttribute('src',url);         
  }
function saveProject(){}

