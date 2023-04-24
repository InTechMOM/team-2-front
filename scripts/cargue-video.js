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
const videoContainer = document.getElementById("project-video")

function loadYouTubeVideo(){
  // https://www.youtube.com/watch?v=OWKXEJN67FE
  // https://www.youtube.com/embed/9N9opF-PK5k
  // https://www.youtube.com/watch?v=9N9opF-PK5k
  // const youtubeUrl = 'https://www.youtube.com/watch?v=OWKXEJN67FE&t=4'
  const url = linkInput.value;
  const queryString = url.slice(url.indexOf('?'))
  const params = new URLSearchParams(queryString)
  const videoId = params.get('v')
  if (videoId != null) {
    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "445";
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.frameborder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowfullscreen = true;
    videoContainer.innerHTML = "";
    videoContainer.appendChild(iframe)
  }
}
function saveProject(){}

