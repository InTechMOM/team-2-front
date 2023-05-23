function createTab(id, studentName, projectName, videoUrl, description) {
  const divTab = document.createElement('div')
  divTab.className = 'tab'
  divTab.innerHTML = `
    <input class="input-menu" type="radio" id="rd${id}" name="rd">
    <label class="tab-label" for="rd${id}">
      <div>
        <div class="tab__student-name">${studentName}</div>
        <div class="tab__project-name">${projectName}</div>
      </div>
    </label>
    <div class="tab-content">
      <button class="button-as-link" onclick="loadProject(${id})">${videoUrl}</button>
      <div>
      ${description}
      </div>
    </div>
  `
  return divTab
}

function getProjects() {
  // Emula llamado a la API
  return Array(15).fill(0).map((item, index) => ({
    id: index,
    studentName: 'Martina Zambrano',
    projectName: 'In tech mom - inicio docente',
    videoUrl: 'https://www.youtube.com/watch?v=afo7Ynw-BX8',
    description: 'Descripcion: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptas illo repudiandae deleniti possimus fugit reiciendis voluptatibus libero autem tenetur, quos aspernatur amet, porro, quibusdam sint eum accusantium explicabo! Excepturi.'
  }))
}

let projects = []

function loadProjectsOnTab () {
  projects = getProjects()
  const tabsContainer = document.getElementById('tabs-container')
  for (const project of projects) {
    const tabElement = createTab(project.id, project.studentName, project.projectName, project.videoUrl, project.description)
    tabsContainer.appendChild(tabElement)
  }
}

loadProjectsOnTab()



const videoContainer = document.getElementById("repro-video");
let evaluatedSkills = []

function loadProject(id) {
  const projectContainer = document.getElementById('project-section')
  projectContainer.classList.remove('hide')
  const project = projects.find(project => project.id == id)
  loadYouTubeVideo(project.videoUrl)
  evaluatedSkills = []
  console.log(project)
}

function loadYouTubeVideo(url){
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

// ***** estrellas

// check if there is a rating stars div on the page
if(document.querySelector(".starIcon1") != undefined){

  // initialize the rating stars list as a global variable to reuse it later
  let stars = [];

  // init the stars query selectors
  function starQueryInit(){
      // create the querySelector of each 5 stars and push it to the stars list
      for(let i=1; i <= 5; i++){
          stars.push(document.querySelector(".starIcon"+i));
      }
  }

  // remove the clickedStar class on every stars
  function removeClickedStar(){
      for(let i = 0; i < stars.length; i++){
          stars[i].classList.remove("clickedStar");
      }
  }

  // add the clickedStar function when clicked and check his radio button
  function addClickedStar(numStar){
      // clickedStar function when clicked
      for(let i = 0; i < numStar; i++){
          stars[i].classList.add("clickedStar");
      }
      // check his radio button
      document.querySelector("input[type=radio].star"+numStar).checked = true;
      let checkedValue = document.querySelector('input[name="comment[rating]"]:checked').value;
      // console.log(checkedValue);
  }

  // translate hover effect
  function translateHover(numStar, translateY){
      for(let i = 0; i < numStar; i++){
          stars[i].style.transform = translateY;
      }
  }

  function createRatingEventListeners(){
      // create the translateY up and down values
      let translateLst = ["translateY(-5px)", "translateY(0px)"];
      // iterate over the stars and add event listeners
      for(let i = 0; i < stars.length; i++){
          // set the number of star value
          let numStar = i+1;

          // hover effect translateY up and down
          // add the up translateY hover effect
          stars[i].addEventListener("mouseover", ()=>{
              translateHover(numStar, translateLst[0]);
          });
          // add the up translateY hover effect
          stars[i].addEventListener("mouseout", ()=>{
              translateHover(numStar, translateLst[1]);
          });

          // click event listener (change color and check the radio button)
          stars[i].addEventListener("click", ()=> {
              // remove all the clickedStar
              removeClickedStar();
              // add clickedStar and check his radio button
              addClickedStar(numStar);
          });
      }
  }

  // init the stars query selectors
  starQueryInit();
  // create the events listeners
  createRatingEventListeners();
}


let habiliOptions = document.querySelector(".habilidades-select");

const btnAdd = document.getElementById("btn-añadir");

function getStarCalification () {
  const inputs = document.getElementsByName('comment[rating]')
  for (const input of inputs) {
    if (input.checked) {
      return Number(input.value)
    }
  }
  return 0;
}

btnAdd.addEventListener('click', () => {
  const habiliName = habiliOptions.options[habiliOptions.selectedIndex].text;
  const time = document.getElementById('input-min').value
  const stars = getStarCalification()
  const comments = document.getElementById('coments').value
  const evaluatedSkill = {
    habiliName,
    time,
    stars,
    comments
  }
  createSection(habiliName, stars)
  evaluatedSkills.push(evaluatedSkill)
  console.log(habiliName)
  console.log(time)
})


function createSection(habiliName,caliStar ) {
  const divSection = document.createElement('div')
  divSection.innerHTML = `
  <div class= "fila-evaluacion">
  <div class="habilidades-name">${habiliName}</div>
  <div class="calificacion-start">
  <i class="${caliStar >= 1 ? 'clickedStar' : ''} fa fa-star"></i>
  <i class="${caliStar >= 2 ? 'clickedStar' : ''} fa fa-star"></i>
  <i class="${caliStar >= 3 ? 'clickedStar' : ''} fa fa-star"></i>
  <i class="${caliStar >= 4 ? 'clickedStar' : ''} fa fa-star"></i>
  <i class="${caliStar >= 5 ? 'clickedStar' : ''} fa fa-star"></i>
  ${caliStar}
  </div>
  <input class="radio-x" id="btn-radio" type="radio" value="6">
  <i class="fa-regular fa-circle-xmark"></i>
  </div>
  
  `
  const container = document.getElementsByClassName('section-evaluacion')[0]
  container.appendChild(divSection)
}
createSection(habiliName,);

const btnEnd = document.getElementById("btn-finalizar");
btnEnd.addEventListener('click', () => {
  Swal.fire({

  })
Swal.fire({
  imageUrl: '../images/Mesa_de_trabajo_1.png',
  title: '¡Evaluación Finalizada con éxito!',
  
})
})